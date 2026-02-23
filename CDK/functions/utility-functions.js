//////////////////Functions///////////////////////////////////////////////////////////////////////////////
const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(body)
})

////////////////////////////////////GET REQUESTS///////////////////////////////////////////////////////////

export const getArticleHandler = async (event, context) => {
    console.log('getArticleHandler invoked')  
    console.log(event)
    console.log(context)

    const articleId = event.articleId || event.queryStringParameters?.articleId || event.pathParameters?.articleId || 'NOT_SET'
    console.log(`PARAMS: articleId = ${articleId}`)

  if(articleId === "NOT_SET") {
    return {
        statusCode: 404,
        body: JSON.stringify({
            status: "error",
            message: "Missing article ID",
        })
    }
  } else {
    return{
        statusCode: 200,
        body: JSON.stringify({
        status: 'ok',
        article: {
            article_id: articleId,
            article_title: 'Cannon discovered in Derbyshire Field. Peasants deny all knowledge', 
            article_summary: 'A Middle Ages cannon was discovered in the Derbyshire Dales District', 
            article_text: 'More text about our very interesting first article', 
            article_submitted_at:'2026-02-02T14:35:12.345Z', 
            aricle_publishead_at: '2026-02-02T14:35:12.345Z',
            article_historical_date: 1500,
            article_status_id: 4,
            article_rating: 0,
            article_image_path: "article-images/article1.jpg",
            article_journalist_id: 1,
            article_editor_id: 2
            }
        })

    }
  }
  
}

export const getUserProfileHandler = async (event, context) => {
  console.log('getUserProfileLambdaHandler invoked')
  console.log(event)
  console.log(context)

  const userId = event.userId || event.queryStringParameters?.userId || event.pathParameters?.userId || 'NOT_SET'
  console.log(`PARAMS: userId = ${userId}`)

  if(userId === 'NOT_SET'){
    return {
      statusCode: 404,
      body: JSON.stringify({
        status: "error", 
        message: "Missing user ID",
        })
      }
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
        status: 'ok',
        article: {
          user_id: userId, 
          user_name: 'DashNotDave1987', 
          first_name: 'Darshan',
          last_name: 'Dave',
          user_email: 'DashNotDave@cars.com',
          user_genres: ['Cars', 'Politics'],
          profilePicture: "client/public/user_images/reba.jpg"
         
        }
      }
    )
  }
}}


export const getJournalistArticleHandler= async (event, context) => {
    console.log('getJournalistArticleHandler invoked')  
    console.log(event)
    console.log(context)

    const journalistId = event.journalistId || event.queryStringParameters?.journalistId || event.pathParameters?.journalistId || 'NOT_SET'
    console.log(`PARAMS: journalistId = ${journalistId}`)

  if(journalistId === "NOT_SET") {
    return {
        statusCode: 404,
        body: JSON.stringify({
            status: "error",
            message: "Missing journalist ID",
        })
    }
  } else {
    return{
        statusCode: 200,
        body: JSON.stringify({
        status: 'ok',
        journalistArticles: [
          {
            article_id: 1,
            article_title: 'Cannon discovered in Derbyshire Field. Peasants deny all knowledge', 
            article_date_sumbit: '2026-02-02T14:35:12.345Z',
            article_status: 'published'
          },
          {
            article_id: 2,
            article_title: 'Man falls aasleep', 
            article_date_sumbit: '2026-02-02T14:35:12.345Z',
            article_status: 'published'
          },
          {
            article_id: 3,
            article_title: 'Developers discover new way to make money', 
            article_date_sumbit: '2026-02-02T14:35:12.345Z',
            article_status: 'published'
          },
          {
            article_id: 4,
            article_title: 'Lego can improve mood', 
            article_date_sumbit: '2026-02-02T14:35:12.345Z',
            article_status: 'published'
          },
          {
            article_id: 5,
            article_title: 'Wrting articles can improve mood', 
            article_date_sumbit: '2026-02-02T14:35:12.345Z',
            article_status: 'published'
          }
        ]
        })
    }
  }
}


export const getMainPageArticlesHandler = async (event, context) => {
    console.log('getMainPageArticlesHandler invoked')  
    console.log(event)
    console.log(context)
  
    const articles = true
    
  if(!articles) {
    return {
        statusCode: 404,
        body: JSON.stringify({
            status: "error",
            message: "Articles not found",
        })
    }
  } else {
    return{
        statusCode: 200,
        body: JSON.stringify({
        status: 'ok',
        article: [
          {
            article_id: 1,
            article_title: 'Cannon discovered in Derbyshire Field. Peasants deny all knowledge', 
            article_date_published: '2026-02-02T14:35:12.345Z',
            article_summary: 'This is a summary',
            article_image_path: 'This is an image path'
          },
          {
            article_id: 2,
            article_title: 'this is a second article title', 
            article_date_published: '2026-02-02T14:35:12.345Z',
            article_summary: 'This is a summary',
            article_image_path: 'This is an image path'
          },
          {
            article_id: 3,
            article_title: 'this is a third article title', 
            article_date_published: '2026-02-02T14:35:12.345Z',
            article_summary: 'This is a summary',
            article_image_path: 'This is an image path'
          },
          {
            article_id: 4,
            article_title: 'this is a fourth article title', 
            article_date_published: '2026-02-02T14:35:12.345Z',
            article_summary: 'This is a summary',
            article_image_path: 'This is an image path'
          }
        ]
        })

    }
  }
}


////////////////////POST REQUESTS/////////////////////////////////////////////////////////////

export const postHealthCheckHandler = async(event, context) => {
  console.log(event.body)

  const body = event.body ? JSON.parse(event.body) : {}

  if(!body.message) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "missing message in post request body"
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: body.message
    })
  }
}

const postImageHandler = async(event) => {
  console.log(event)

  const body = JSON.stringify(event.body)
}

// const hashPassword = (
//   password,
//   salt = crypto.randomBytes(16).toString("hex") // random per user
// ) => {
//   const iterations = 100_000 // how many rounds of hashing
//   const keylen = 64 // output length in bytes
//   const digest = "sha512" // hash algorithm used internally by pbkdf2

//   // pbkdf2Sync returns raw bytes, we convert to a hex string for storage
//   const hash = crypto
//     .pbkdf2Sync(password, salt, iterations, keylen, digest)
//     .toString("hex")

//   return { salt, hash, iterations, digest }
// }

// const verifyPassword = (password, stored) => {
//   const { salt, hash, iterations, digest } = stored

//   // Re create the hash using the original salt + settings
//   const candidate = crypto
//     .pbkdf2Sync(password, salt, iterations, 64, digest)
//     .toString("hex")

//   // Compare both hashes safely
//   return crypto.timingSafeEqual(
//     Buffer.from(candidate, "hex"),
//     Buffer.from(hash, "hex")
//   )
// }

// export const postLoginHandler = async (event, context) => {
//   console.log(event)

//   const { username, password } = JSON.parse(event.body) //pass event data in json format (?)

//   console.log(username)
//   console.log(password)

//   if(!username || !password) {
//     return {
//       statusCode: 404,
//       body: JSON.stringify({
//           status: "error",
//           message: "username or password not found",
//       })
//     }
//   }

//   // replace this with call to db to get this object
//   const databasePassword = {
//     salt: "randomSalt",
//     hash: "randomHash",
//     iterations: 10000,
//     digest: "idk",
//   }

//   // replace this with call to db to get the user role
//   const userRoleId = 1

//   // the above can be a select statement in the users table to get the password and the user role id

//   const verified = verifyPassword(password, databasePassword)

//   if(true){
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         username: event.body.username,
//         roleId: userRoleId
//       })
//     }
//   }
// }

export const postArticleHandler = async (event) => {
   try {
    // If env vars are missing, we cannot talk to DynamoDB
    // if (!TABLE_NAME) {
    //   return jsonResponse(500, { status: "error", message: "Missing DYNAMO_TABLE_NAME" })
    // }
    // if (!REGION) {
    //   return jsonResponse(500, { status: "error", message: "Missing DYNAMO_REGION" })
    // }

    // API Gateway gives us the request body as a string
    const body = event.body ? JSON.parse(event.body) : {}

    // Normalise email so log in is consistent
    const article_title = body.article_title ?? ""
    const article_summary = body.article_summary ?? ""
    const article_text = body.article_text ?? ""
    const article_submitted_at = body.article_submitted_at 

    const article_id = 1 //this is dummy data. It will need to be returned by the sql

    return jsonResponse(201, {
      status: "created",
      article_id: article_id
    })
  }
    catch (err) {
    // If the conditional write failed, the user already exists
    if (err?.name === "ConditionalCheckFailedException") {
      return jsonResponse(409, { status: "error", message: "User already exists" })
    }

    console.error("postUsersHandler error:", err)
    return jsonResponse(500, { status: "error", message: "Could not create user" })
  }
}
//////////////////////////////PUT ARTICLE/////////////////////////////////////////////////////////////////////

export const putArticleHandler = async (event) => { //handler for adding article to website/database
  console.log('putArticleHandeler invoked')  
  console.log(event.body)

  const body = event.body ? JSON.parse(event.body) : {}

  if(!body.message) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "missing message in post request body"
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: body.message
    })
  }
}
