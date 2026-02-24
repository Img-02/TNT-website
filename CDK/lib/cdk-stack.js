import path from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync } from 'fs'
import { join } from 'path'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as rds from 'aws-cdk-lib/aws-rds'
import * as cdk from 'aws-cdk-lib'
import { Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigw from 'aws-cdk-lib/aws-apigateway'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export class CdkStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // ----------------------------------
    // Domains
    // ----------------------------------
    const fullDomain = `${props.subDomain}.${props.domainName}`
    const staticImagesInS3Domain = `static-images-${props.subDomain}.${props.domainName}`

    // ----------------------------------
    // Tags
    // ----------------------------------
    cdk.Tags.of(this).add('Owner', props.stackName)
    cdk.Tags.of(this).add('Project', 'TNT-News')
    
    // ----------------------------------
    // Permissions boundary
    // ----------------------------------
    const boundary = iam.ManagedPolicy.fromManagedPolicyName(this, 'Boundary', props.permissionsBoundaryPolicyName)
    
    iam.PermissionsBoundary.of(this).apply(boundary)
    

    // ----------------------------------
    // Networking
    // ----------------------------------

    // Look up the shared VPC to place our database in
    // Other services can then join the same network
    const sharedVpc = ec2.Vpc.fromLookup(this, 'sharedVpc', {
      vpcName: props.vpcName,
      region: props.env.region
    })
    
    // // ----------------------------------
    // // Databases - ONLY UNCOMMENT THIS WHEN YOU ARE READY TO ADD A DATABASE / YOUR APPICATION IS SET UP TO UTILISE A DATABASE AS IT'S CRAZY EXPENSIVE 
    // // ----------------------------------
    // // Db configuration – Postgres engine and parameter group

    // Choose the Aurora Postgres engine version
    const postgresVersion = rds.AuroraPostgresEngineVersion.VER_13_20;

    const postgresEngine = rds.DatabaseClusterEngine.auroraPostgres({
      version: postgresVersion,
    });

    // Create a parameter group that forces SSL
    const postgresParameterGroup = new rds.ParameterGroup(
      this,
      'postgres-parameter-group',
      {
        name: `${props.subDomain}-ParameterGroup`,
        engine: postgresEngine,
        description: `${props.subDomain} parameter group with SSL enforced`,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        parameters: {
          'rds.force_ssl': '1' // require SSL for database connections
        }
      }
    )

    const cluster = new rds.DatabaseCluster(this, 'rds-cluster', {
      // Use the Postgres engine we defined above
      engine: postgresEngine,
      // Attach our parameter group so SSL is enforced
      parameterGroup: postgresParameterGroup,
      // Name of the default database in this cluster
      defaultDatabaseName: props.dbName,
      // Put the cluster into the shared CTA VPC
      vpc: sharedVpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED
      },
    
      // Aurora Serverless v2 configuration
      writer: rds.ClusterInstance.serverlessV2('writer'),
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 1,
    
      // Needed for the Data API from our Lambdas
      enableDataApi: true,
    
      // Tear the database down with the stack (fine for a lab, not for prod)
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    // ----------------------------------
    // S3 buckets
    // ----------------------------------
    const staticImagesBucket = new s3.Bucket(this, 'static-images', {
      bucketName: `${props.subDomain}-static-images`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: true,
        ignorePublicAcls: true,
        blockPublicPolicy: false,
        restrictPublicBuckets: false
      })
    })

    const clientBucket = new s3.Bucket(this, 'client-bucket', {
      bucketName: `${props.subDomain}-client-bucket`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      websiteIndexDocument: 'index.html',
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: true,
        ignorePublicAcls: true,
        blockPublicPolicy: false,
        restrictPublicBuckets: false
      })
    })

    clientBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.DENY,
        actions: ['s3:*'],
        resources: [
          clientBucket.bucketArn,
          clientBucket.arnForObjects('*')
        ],
        conditions: {
          Bool: { 'aws:SecureTransport': 'false' }
        },
        principals: [new iam.AnyPrincipal()]
      })
    )

    clientBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject'],
        resources: [clientBucket.arnForObjects('*')],
        principals: [new iam.AnyPrincipal()]
      })
    )
    
    // ----------------------------------
    // Certificate
    // ----------------------------------
    const cert = acm.Certificate.fromCertificateArn(this,
      'BakehouseCert', //Don't change this i only made one cert 
      props.certArn
    )

    // ----------------------------------
    // CloudFront function
    // ----------------------------------

    // You will have to impliment redirecting in cloudfront 
    const redirectsFunction = new cloudfront.Function(this, 'redirects-function', {
      functionName: `${props.subDomain}-redirects`,
      code: cloudfront.FunctionCode.fromFile({
        filePath: 'functions/redirects.js'
      })
    })

    const clientQueryPolicy = new cloudfront.OriginRequestPolicy(this,'client-query-policy',{
      originRequestPolicyName: `${props.subDomain}-client-query-policy`,
      queryStringBehavior:
        cloudfront.OriginRequestQueryStringBehavior.all()
    })

    // ----------------------------------
    // Lambda bundling
    // ----------------------------------
    const bundling = {
      externalModules: ['aws-sdk'],
      nodeModules: ['data-api-client']
    }

    const lambdaEnvVars = {
      NODE_ENV: 'production',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_NAME: props.dbName,
      // When we add in a DB you can uncomment these 
      CLUSTER_ARN: cluster.clusterArn,
      SECRET_ARN: cluster.secret?.secretArn || 'NOT_SET',
      STATIC_IMAGES_BUCKET: staticImagesBucket.bucketName,
      STATIC_IMAGES_BASE_URL: `https://${staticImagesInS3Domain}`
    }

    // ----------------------------------
    // Lambdas
    // ----------------------------------
    
        // Write your other lambdas into here

    // Grant Lambdas that need it access to the Aurora Data API
    const healthcheckLambda = new nodejs.NodejsFunction(this, 'health-check-lambda', {
      functionName: `${props.subDomain}-health-check-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/health-check.js',
      handler: 'healthcheckHandler'
    })

    const bootstrapLambda = new nodejs.NodejsFunction(this, 'bootstrap-lambda', {
      functionName: `${props.subDomain}-bootstrap-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'bootstrapHandler',
      bundling,
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      environment: lambdaEnvVars
    })

    const getArticlesLambda = new nodejs.NodejsFunction(this, 'get-articles-lambda', {
      functionName: `${props.subDomain}-get-articles-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'getArticlesHandler',
      bundling,
      environment: lambdaEnvVars,
      timeout: cdk.Duration.seconds(10),
      memorySize: 256
    });
    // Write your other lambdas into here

    // Grant Lambdas that need it access to the Aurora Data API
    cluster.grantDataApiAccess(bootstrapLambda)
    cluster.grantDataApiAccess(getArticlesLambda);

    const postHealthCheckLambda = new nodejs.NodejsFunction(this, 'post-health-check-lambda', {
      functionName: `${props.subDomain}-post-health-check-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'postHealthCheckHandler'
    })

    const getArticleLambda = new nodejs.NodejsFunction(this, 'get-article-lambda', {
      functionName: `${props.subDomain}-get-article-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'getArticleHandler'
    })

    const getMainPageArticlesLambda = new nodejs.NodejsFunction(this, 'get-main-page-articles-lambda', {
      functionName: `${props.subDomain}-get-main-page-articles-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'getMainPageArticlesHandler'
    })

    const getUserProfileLambda = new nodejs.NodejsFunction(this, 'get-user-profile-lambda', {
      functionName: `${props.subDomain}-get-user-profile-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'getUserProfileHandler'
    })

    const getJouralistArticlesLambda = new nodejs.NodejsFunction(this, 'get-journalist-article-lambda', {
      functionName: `${props.subDomain}-get-journalist-article-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'getJournalistArticleHandler'
    })

    const getEditorArticlesLambda = new nodejs.NodejsFunction(this, 'get-editor-article-lambda', {
      functionName: `${props.subDomain}-get-editor-article-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'getEditorArticleHandler'
    })

    const postLoginLambda = new nodejs.NodejsFunction(this, 'post-login-lambda', {
      functionName: `${props.subDomain}-post-login-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'loginHandler'
    })

    const postSignUpLambda = new nodejs.NodejsFunction(this, 'post-signup-lambda', {
      functionName: `${props.subDomain}-post-signup-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'postUsersHandler'
    })

    const postArticleLambda = new nodejs.NodejsFunction(this, 'post-article-lambda', {
      functionName: `${props.subDomain}-post-article-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'postArticleHandler'
    })

    const postImageLambda = new nodejs.NodejsFunction(this, 'post-image-lambda', {
      functionName: `${props.subDomain}-post-image-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'postImageHandler'
    })
    
    const putArticleLambda = new nodejs.NodejsFunction(this, 'put-article-lambda', {
      functionName: `${props.subDomain}-put-article-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'putArticleHandler'
    })

    const putUserLambda = new nodejs.NodejsFunction(this, 'put-user-lambda', {
      functionName: `${props.subDomain}-put-user-lambda`,
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'functions/utility-functions.js',
      handler: 'putUserHandler'
    })

    // ----------------------------------
    // API Gateway
    // ----------------------------------
    const api = new apigw.RestApi(this, 'apigw', {
      restApiName: `${props.subDomain}-api`,
      description: `${props.subDomain} api gateway`,
      deploy: true,
      deployOptions: {
        stageName: 'api'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'Access-Control-Allow-Origin',
          'Access-Control-Request-Method',
          'Access-Control-Request-Headers'
        ],
        allowMethods: ['*'],
        allowOrigins: ['*'],
        allowCredentials: true
      }
    })

    api.addUsagePlan('apigw-rate-limits', {
      name: `${props.subDomain}-apigw-rate-limits`,
      throttle: {
        rateLimit: 10,
        burstLimit: 5
      }
    })

    // Expose endpoint `/api/healthcheck`
    const healthchckAPI = api.root.addResource('healthcheck')
    // Allow `/api/healthcheck` to receive GET requests, and tell it which lambder to trigger whn it does
    healthchckAPI.addMethod('GET', new apigw.LambdaIntegration(healthcheckLambda))
    healthchckAPI.addMethod('POST',new apigw.LambdaIntegration(postHealthCheckLambda))
    
    //expose endpoint /api/article
    //returns individual article info to display on screen
    const articleAPI = api.root.addResource('article')
    articleAPI.addMethod('GET', new apigw.LambdaIntegration(getArticleLambda))
    articleAPI.addMethod('POST', new apigw.LambdaIntegration(postArticleLambda)) //adds individual article to store in table
    articleAPI.addMethod('PUT', new apigw.LambdaIntegration(putArticleLambda)) //updates individual article to store in table
    // //expose end point /api/user
    // //updated db with user info and returns updated account 
    const userAPI = api.root.addResource('user')
    userAPI.addMethod('POST', new apigw.LambdaIntegration(postSignUpLambda))
    userAPI.addMethod('GET', new apigw.LambdaIntegration(getUserProfileLambda))
    userAPI.addMethod('PUT', new apigw.LambdaIntegration(putUserLambda)) 
    
    // // expose endpoint /api/login
    // // validates a users login
    const logInAPI = api.root.addResource('login')
    logInAPI.addMethod('POST', new apigw.LambdaIntegration(postLoginLambda))
    
    // // expose endpoint /api/journalist-articles
    // // gets articles by a certain journalist
    const journalistArticlesAPI = api.root.addResource('journalist-articles')
    journalistArticlesAPI.addMethod('GET', new apigw.LambdaIntegration(getJouralistArticlesLambda))

    // // expose endpoint /api/editor-articles
    // // gets articles being edited by a certain editor
    const editorArticlesAPI = api.root.addResource('editor-articles')
    editorArticlesAPI.addMethod("GET", new apigw.LambdaIntegration(getEditorArticlesLambda))

    // // expose endpoint /api/mainpage
    // // returns articles to display on home page (only main text, date)
    const loadMainPageStoriesAPI = api.root.addResource('mainpage')
    loadMainPageStoriesAPI.addMethod('GET', new apigw.LambdaIntegration(getMainPageArticlesLambda))
    // // expose endpoint /api/image-upload
    // // posts images to S3 bucket
    const uploadImagesAPI = api.root.addResource("image-upload")
    uploadImagesAPI.addMethod("POST", new apigw.LambdaIntegration(postImageLambda))
    
    const articlesApi = api.root.addResource('articles');
    articlesApi.addMethod('GET', new apigw.LambdaIntegration(getArticlesLambda));

    // ----------------------------------
    // CloudFront distributions
    // ----------------------------------

    const clientDistribution = new cloudfront.Distribution(this, 'client-distribution', {
      defaultBehavior: {
        origin: new origins.S3BucketOrigin(clientBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originRequestPolicy: clientQueryPolicy,
        functionAssociations: [
          {
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            function: redirectsFunction
          }
        ]
      },
      additionalBehaviors: {
        '/api/*': {
          origin: new origins.HttpOrigin(
            `${api.restApiId}.execute-api.${props.env.region}.amazonaws.com`
          ),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER
        }
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0)
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0)
        }
      ],
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      domainNames: [fullDomain],
      certificate: cert
    })

    new s3Deployment.BucketDeployment(this, 'client-deployment', {
      destinationBucket: clientBucket,
      sources: [
        s3Deployment.Source.asset(
          path.resolve(__dirname, '../../client/dist') // THIS PATH NEEDS TO BE CORRECT TO YOUR CLIENT(REACT) DIST FOLDER - this is created when you build your react app
        )
      ],
      prune: true,
      memoryLimit: 256,
      distribution: clientDistribution,
      distributionPaths: ['/*']
    })

    const staticImagesDistribution = new cloudfront.Distribution(this,'static-images-distribution',{
      defaultBehavior: {
        origin: new origins.S3BucketOrigin(staticImagesBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            function: redirectsFunction
          }
        ]
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      domainNames: [staticImagesInS3Domain],
      certificate: cert
    })

    new s3Deployment.BucketDeployment(this, 'static-images-deployment', {
      destinationBucket: staticImagesBucket,
      sources: [
        s3Deployment.Source.asset(
          path.resolve(__dirname, '../../client/static-images') // THIS PATH NEEDS TO BE CORRECT TO YOUR FOLDER that has static images inside
        )
      ],
      prune: true,
      memoryLimit: 256,
      distribution: staticImagesDistribution,
      distributionPaths: ['/*']
    })


    // ----------------------------------
    // Route 53
    // ----------------------------------
    const zone = route53.HostedZone.fromLookup(this, 'zone', { domainName: props.domainName })

    new route53.CnameRecord(this, 'static-images-record', {
      zone,
      recordName: staticImagesInS3Domain,
      domainName: staticImagesDistribution.distributionDomainName
    })

    new route53.CnameRecord(this, 'client-record', {
      zone,
      recordName: fullDomain,
      domainName: clientDistribution.distributionDomainName
    })

    // ----------------------------------
    // Write to a client env file - You might need to know the domain to access static images from your react files!
    // ----------------------------------
    writeFileSync(
      join(__dirname, '../../client/.env.production'), // THIS PATH WILL NEED TO CHANGE TO BE IN YOUR CLIENT DIRECTORY
      `VITE_ARTICLE_IMAGES_DOMAIN=https://${staticImagesInS3Domain}\n`
    )

    // --------------------------------------------------
    // OUTPUTS INTO THE CONSOLE 
    // --------------------------------------------------

    // --------------------------------------------------
    // 01 – Site URLs (What users open in the browser)
    // --------------------------------------------------

    new cdk.CfnOutput(this, "01_Site_ClientUrl", {
      value: `https://${fullDomain}`
    })

    new cdk.CfnOutput(this, "01_Site_StaticImagesUrl", {
      value: `https://${staticImagesInS3Domain}`
    })


    // --------------------------------------------------
    // 02 – API Endpoints (What devs test)
    // --------------------------------------------------

    new cdk.CfnOutput(this, "02_Api_Healthcheck_ViaCloudFront", {
      value: `https://${fullDomain}/api/healthcheck`
    })

    new cdk.CfnOutput(this, "02_Api_Healthcheck_DirectApiGateway", {
      value: `https://${api.restApiId}.execute-api.${props.env.region}.amazonaws.com/api/healthcheck`
    })


    // --------------------------------------------------
    // 03 – CloudFront (Debugging + invalidations)
    // --------------------------------------------------

    new cdk.CfnOutput(this, "03_CloudFront_ClientDistributionId", {
      value: clientDistribution.distributionId
    })

    new cdk.CfnOutput(this, "03_CloudFront_ClientDistributionDomain", {
      value: clientDistribution.distributionDomainName
    })

    new cdk.CfnOutput(this, "03_CloudFront_StaticImagesDistributionId", {
      value: staticImagesDistribution.distributionId
    })

    new cdk.CfnOutput(this, "03_CloudFront_StaticImagesDistributionDomain", {
      value: staticImagesDistribution.distributionDomainName
    })


    // --------------------------------------------------
    // 04 – Storage (S3 Buckets)
    // --------------------------------------------------

    new cdk.CfnOutput(this, "04_S3_ClientBucketName", {
      value: clientBucket.bucketName
    })

    new cdk.CfnOutput(this, "04_S3_StaticImagesBucketName", {
      value: staticImagesBucket.bucketName
    })


    // --------------------------------------------------
    // 05 – Compute (Lambdas)
    // --------------------------------------------------

    new cdk.CfnOutput(this, "05_Lambda_HealthcheckFunctionName", {
      value: healthcheckLambda.functionName
    })


    // --------------------------------------------------
    // 06 – Database (Aurora Serverless v2)
    // COMMENT THIS SECTION OUT UNTIL AURORA IS ENABLED
    // --------------------------------------------------

    /*
    new cdk.CfnOutput(this, "06_Database_ClusterArn", {
      value: cluster.clusterArn
    })

    new cdk.CfnOutput(this, "06_Database_ClusterEndpoint", {
      value: cluster.clusterEndpoint.hostname
    })

    new cdk.CfnOutput(this, "06_Database_Name", {
      value: props.dbName
    })

    new cdk.CfnOutput(this, "06_Database_SecretArn", {
      value: cluster.secret?.secretArn || "NOT_SET"
    })
    */

  }
}

