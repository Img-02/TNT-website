# Welcome to your Group Project Infrastructure

This folder contains the AWS infrastructure for your group project.

Up until now you have only worked on the front end React application.\
We are now introducing:

-   Infrastructure as Code
-   API Gateway
-   Lambda
-   CloudFront
-   S3
-   Custom domains

All of this is managed using AWS CDK (JavaScript).

------------------------------------------------------------------------

# What This CDK Project Does

This stack currently provisions:

-   An S3 bucket for your React client
-   A CloudFront distribution in front of that bucket
-   A second S3 bucket for static images
-   A CloudFront distribution for static images
-   An API Gateway
-   A Lambda health check endpoint
-   Route53 records for custom domains
-   A CloudFront Function ready for SPA routing

You will extend this as your project grows.

------------------------------------------------------------------------

# Folder Structure

Your project should now look like this:

    group-project/
    │
    ├── client/               # Your React front end
    │   ├── static-images/    # You will have to create this folder and move your images to it (update paths in react)
    │
    ├── cdk/                  # Your infrastructure
    │   ├── bin/
    │   ├── lib/
    │   └── package.json
    │   └── all the other files


If your React app is not already inside a `client` folder, rename it.

The CDK folder must sit alongside your client folder, not inside it.

------------------------------------------------------------------------

# Getting Started

## 1. Set your stack name

Each group must deploy their own stack.\
We use an environment variable to control this.

Mac users:

``` bash
echo 'export GROUP_PROJECT_STACK_NAME=<YOUR_TEAM_NAME>' >> ~/.zshrc
source ~/.zshrc
```

Git Bash users:

``` bash
echo 'export GROUP_PROJECT_STACK_NAME=<YOUR_TEAM_NAME>' >> ~/.bashrc
source ~/.bashrc
```

Replace `<YOUR_TEAM_NAME>` with your team name.

Example:

``` bash
export GROUP_PROJECT_STACK_NAME=TimeTravellersNews
```

This becomes your subdomain.

You will need to source your terminal after exporting that value

```bash
source ~/.bashrc
``` 

And then you should be able to echo that value to make sure its available 

```bash
echo $GROUP_PROJECT_STACK_NAME
``` 

------------------------------------------------------------------------

## 2. Install dependencies

Inside the `cdk` folder:

``` bash
npm install
```

------------------------------------------------------------------------

## 3. Build your React app

Before deploying infrastructure, build your front end:

``` bash
cd ../client
npm i
npm run build
```

This creates the `dist` folder that CDK uploads to S3.

------------------------------------------------------------------------

## 4. Deploy

Back inside the CDK folder:

``` bash
aws-login
npx cdk synth
npx cdk deploy
```

After deployment finishes, check the Outputs section.\
This contains:

-   Your site URL
-   Your API endpoint
-   Distribution IDs
-   Bucket names

------------------------------------------------------------------------

# Useful Commands

``` bash
npx cdk synth     # Show the generated CloudFormation
npx cdk diff      # Show changes before deploying
npx cdk deploy    # Deploy to AWS
npx cdk destroy   # Tear everything down
```

------------------------------------------------------------------------

# How The Pieces Connect

When someone visits your site:

1.  Route53 resolves your domain
2.  CloudFront receives the request
3.  CloudFront serves your React app from S3
4.  If the request starts with `/api`, it forwards to API Gateway
5.  API Gateway triggers Lambda
6.  Lambda returns a response

This is a full serverless architecture.

------------------------------------------------------------------------

# What You Will Build Next

You will now:

-   Add new Lambdas
-   Add new API routes
-   Connect your front end to the API
-   Enable Aurora when required

------------------------------------------------------------------------

# Comments

There are lots of comments around the stack file that will guide you as to things that need to be updated to match up with your react folders. 
I would advise you look at the folder structure first, then hook up any paths that need updating (**Deployments**)


# Bakehouse Team Working Guide

## Team Working Strategy

To avoid pushing over each other's changes and breaking the shared CDK
stack, we are separating infrastructure from feature work.

### Step 1 -- Mob the API Layer Together

As a team:

-   Agree the endpoints required
-   Define request and response shapes
-   Create all necessary Lambdas
-   Add API Gateway routes
-   Deploy once

For now, Lambdas should return mocked data - Like they do in the lambda and API GW sessions, look back over the files / utility handlers in those to see an example - the mocked data should represnet what your databse is going to repsond with. 

Example:

``` js
return jsonResponse(200, {
  status: "ok",
  articles: [
    {
      userId: "u_123",
      articleText: "Roman soldiers spotted near Hadrian’s Wall...",
      articleImageUrl: "https://Static-images.../roman.jpg"
    }
  ]
});
```

This gives us:

-   Stable API contracts
-   Real deployed endpoints
-   Fewer stack file conflicts

------------------------------------------------------------------------

### Step 2 -- Frontend Builds Against Real APIs

Frontend must always call:

    /api/...

Never hardcode full domains in components.

Our local dev server forwards `/api` requests to the real deployed API,
meaning:

-   You test against real infrastructure
-   Components handle real responses
-   Loading and error states are realistic

To call an api from your react you might send off a request like this 

```js
  const response = await fetch(`/api/healthcheck`, { method: "GET" });
```

------------------------------------------------------------------------

### Step 3 -- Connect to Aurora Later

Once contracts are stable:

-   Replace mocked responses inside Lambdas
-   Keep response shapes identical
-   Avoid frontend changes

This keeps development parallel and reduces risk.

------------------------------------------------------------------------

# Local Development Setup (Vite Proxy)

This allows `npm run dev` to behave like production.

## 1. Open or create:

    client/vite.config.js

## 2. Add proxy configuration:

``` js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://team-name.cta-training.academy",
        changeOrigin: true,
        secure: true
      }
    }
  }
});
```

Replace the domain if required.

## 3. Restart the dev server

    npm run dev

Vite must restart for proxy changes to apply.

------------------------------------------------------------------------

# How It Works

Local browser calls:

    http://localhost:5173/api/products

Vite forwards the request to:

    https://team-name.cta-training.academy/api/products

Your frontend:

-   Uses clean `/api/...` paths
-   Works locally
-   Works in production
-   Requires no code changes between environments

------------------------------------------------------------------------

# Best Practice Reminders

-   Use one branch per feature
-   Keep API contracts stable
-   Log clearly in Lambdas
-   Avoid hardcoding table names or ARNs
-   Grant least privilege IAM permissions
-   Keep commits small and focused

------------------------------------------------------------------------
This should help with workingin parrallell with each other

