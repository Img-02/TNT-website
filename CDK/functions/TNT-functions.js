import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb"

import crypto from "crypto"
//import { jsonResponse } from "./utility-functions.js"

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(body)
})// CDK passes these in as Lambda environment vars.iables

//////////////////Functions///////////////////////////////////////////////////////////////////////////////

////////////////////////////////////GET REQUESTS///////////////////////////////////////////////////////////


export const getArticleHandler = async (event, context) => {
  console.log('getArticleHandler invoked')
  console.log(event)
  console.log(context)

  const articleId = event.articleId || event.queryStringParameters?.articleId || event.pathParameters?.articleId || 'NOT_SET'
  console.log(`PARAMS: articleId = ${articleId}`)

  if (articleId === "NOT_SET") {
    return {
      statusCode: 404,
      body: JSON.stringify({
        status: "error",
        message: "Missing article ID",
      })
    }
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'ok',
        article: {
          article_id: articleId,
          article_title: 'Cannon discovered in Derbyshire Field. Peasants deny all knowledge',
          article_summary: 'A Middle Ages cannon was discovered in the Derbyshire Dales District',
          article_text: 'More text about our very interesting first article',
          article_submitted_at: '2026-02-02T14:35:12.345Z',
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

  if (userId === 'NOT_SET') {
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
  }
}


export const putUserHandler  = async (event) => {
  console.log(event)

  const body = event.body ? JSON.parse(event.body) : {}

    if (!body.user_id) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "missing message in post request body"
      })
    }
  }
  const user_first_name = body.user_first_name ?? ""
  const user_surname = body.user_surname ?? ""
  const user_username = body.user_username ?? ""
  const user_password = body.user_password ?? ""
  const user_email = body.user_email ?? ""
  const user_profile_pic = body.user_profile_pic ?? 2000
  const user_role_id = body.user_role_id ?? 0

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "put handler function done"
    })
  }
}

export const getJournalistArticleHandler = async (event, context) => {
  console.log('getJournalistArticleHandler invoked')
  console.log(event)
  console.log(context)

  const journalistId = event.journalistId || event.queryStringParameters?.journalistId || event.pathParameters?.journalistId || 'NOT_SET'
  console.log(`PARAMS: journalistId = ${journalistId}`)

  if (journalistId === "NOT_SET") {
    return {
      statusCode: 404,
      body: JSON.stringify({
        status: "error",
        message: "Missing journalist ID",
      })
    }
  } else {
    return {
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

export const getEditorArticleHandler = async (event) => {
  // console.log('getEditorArticleHandler invoked')
  // console.log(event)
  // console.log(context)

  // const editorId = event.editorId || event.queryStringParameters?.editorId || event.pathParameters?.editorId || 'NOT_SET'
  // console.log(`PARAMS: journalistId = ${editorId}`)

  // if (editorId === "NOT_SET") {
  //   return {
  //     statusCode: 404,
  //     body: JSON.stringify({
  //       status: "error",
  //       message: "Missing editor ID",
  //     })
  //   }
  // } else {
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       status: 'ok',
  //       editorArticles: [
  //         {
  //           article_id: 1,
  //           article_title: 'Cannon discovered in Derbyshire Field. Peasants deny all knowledge',
  //           article_date_sumbit: '2026-02-02T14:35:12.345Z',
  //           article_status: 'published'
  //         },
  //         {
  //           article_id: 2,
  //           article_title: 'Man falls aasleep',
  //           article_date_sumbit: '2026-02-02T14:35:12.345Z',
  //           article_status: 'published'
  //         },
  //         {
  //           article_id: 3,
  //           article_title: 'Developers discover new way to make money',
  //           article_date_sumbit: '2026-02-02T14:35:12.345Z',
  //           article_status: 'published'
  //         },
  //         {
  //           article_id: 4,
  //           article_title: 'Lego can improve mood',
  //           article_date_sumbit: '2026-02-02T14:35:12.345Z',
  //           article_status: 'published'
  //         },
  //         {
  //           article_id: 5,
  //           article_title: 'Wrting articles can improve mood',
  //           article_date_sumbit: '2026-02-02T14:35:12.345Z',
  //           article_status: 'published'
  //         }
  //       ]
  //     })
  //   }
  // }
}


export const getMainPageArticlesHandler = async (event, context) => {
  console.log('getMainPageArticlesHandler invoked')
  console.log(event)
  console.log(context)

  const articles = true

  if (!articles) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        status: "error",
        message: "Articles not found",
      })
    }
  } else {
    return {
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

export const postHealthCheckHandler = async (event, context) => {
  console.log(event.body)

  const body = event.body ? JSON.parse(event.body) : {}

  if (!body.message) {
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

export const postImageHandler = async (event) => {
  console.log(event)
  const body = event.body ? JSON.parse(event.body) : {}
  const image_url = body.image_url

  if (!image_url) {
    return jsonResponse(500, { status: "error", message: "Missing image url" })
  }

  return jsonResponse(200, { status: "success", message: "Image uploaded to S3" })
}


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

  // these are the non null fields which dont have any defaults
  const article_id = body.article_id
  const article_journalist_id = body.article_journalist_id
  const article_status_id = body.article_status_id

  if (!article_id || !article_status_id || !article_journalist_id) {
    return jsonResponse(404, { status: "error", message: "Missing article id" })
  }

  const article_title = body.article_title ?? ""
  const article_summary = body.article_summary ?? ""
  const article_text = body.article_text ?? ""
  const article_submitted_at = body.article_submitted_at ?? ""
  const article_published_at = body.article_published_at ?? ""
  const article_historical_date = body.article_historical_date ?? 2000
  const article_rating = body.article_rating ?? 0
  const article_image_path = body.article_image_path ?? ""
  const article_status = body.article_status ?? 4

  // update the db here

  return jsonResponse(200, { status: "updated", article_id })
}


/* hashPassword(password, salt?)
*
* Goal:
* - Turn a password into a hash that we can safely store.
*
* Why we need a salt:
* - If two users pick the same password, their hashes should still be different.
* - The salt is random per user, so the final hash changes even for same password.
*
* pbkdf2:
* - A "slow" hashing function designed for passwords.
* - Slowness is good here: it makes brute force guessing harder.
*
* What we store:
* - salt: needed to re hash later during login
* - hash: the result
* - iterations + digest: the settings we used, so we can repeat them later
*/
const hashPassword = (
  password,
  salt = crypto.randomBytes(16).toString("hex") // random per user
) => {
  const iterations = 100_000 // how many rounds of hashing
  const keylen = 64 // output length in bytes
  const digest = "sha512" // hash algorithm used internally by pbkdf2

  // pbkdf2Sync returns raw bytes, we convert to a hex string for storage
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex")

  return { salt, hash, iterations, digest }
}


/**
 * verifyPassword(password, stored)
 *
 * Goal:
 * - Check whether the password the user typed produces the same hash as the stored one.
 *
 * How:
 * - Re hash the candidate password using the SAME salt and settings we stored.
 * - Compare the newly produced hash vs the stored hash.
 *
 * timingSafeEqual:
 * - Avoids leaking tiny timing differences during comparison.
 * - This is a small security hardening step.
 */
const verifyPassword = (password, stored) => {
  const { salt, hash, iterations, digest } = stored

  // Re create the hash using the original salt + settings
  const candidate = crypto
    .pbkdf2Sync(password, salt, iterations, 64, digest)
    .toString("hex")

  // Compare both hashes safely
  return crypto.timingSafeEqual(
    Buffer.from(candidate, "hex"),
    Buffer.from(hash, "hex")
  )
}

// ------------------------------------------------------------
// POST /api/users  (Sign up)
// ------------------------------------------------------------
export const postUsersHandler = async (event) => {
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
    const email = body.email?.trim()?.toLowerCase()
    const password = body.password
    const firstname = body.firstname
    const lastname = body.lastname
    const username = body.username

    // Basic validation
    if (!email || !password || !firstname || !lastname || !username) {
      return jsonResponse(400, { status: "error", message: "Email and password are required" })
    }

    // 1) Check if the user already exists (read by primary key)
    // This is why postUsersLambda needs READ permission too.
    // const existing = await ddb.send(
    //   new GetCommand({
    //     TableName: TABLE_NAME,
    //     Key: { email } // Key must match the table partition key name
    //   })
    // )

    // if (existing.Item) {
    //   return jsonResponse(409, { status: "error", message: "User already exists" })
    // }

    // 2) Convert the raw password into a salted hash for storage
    const passwordData = hashPassword(password)

    // 3) Store the new user item in DynamoDB
    // Email is the partition key, so it uniquely identifies the item.
    // await ddb.send(
    //   new PutCommand({
    //     TableName: TABLE_NAME,
    //     Item: {
    //       email,
    //       password: passwordData, // store salt + hash, never raw password
    //       createdAt: new Date().toISOString()
    //     },
    //     // Extra safety: prevents overwriting if a user appears between Get and Put
    //     ConditionExpression: "attribute_not_exists(email)"
    //   })
    // )

    // Respond with safe data only (never return password fields)
    return jsonResponse(201, {
      status: "created",
      user: { email }
    })
  } catch (err) {
    // If the conditional write failed, the user already exists
    if (err?.name === "ConditionalCheckFailedException") {
      return jsonResponse(409, { status: "error", message: "User already exists" })
    }

    console.error("postUsersHandler error:", err)
    return jsonResponse(500, { status: "error", message: "Could not create user" })
  }
}

// ------------------------------------------------------------
// POST /api/login  (Log in)
// ------------------------------------------------------------
export const loginHandler = async (event) => {
  try {

    const body = event.body ? JSON.parse(event.body) : {}
    const username = body.username?.trim()?.toLowerCase()
    const password = body.password

    if (!username || !password) {
      return jsonResponse(400, { status: "error", message: "Username and password are required" })
    }

    // 1) Fetch the user by primary key (fast, direct lookup)

    // 2) Re hash the supplied password and compare to stored hash
    // const ok = verifyPassword(password, user.password)
    // if (!ok) {
    //   return jsonResponse(401, { status: "error", message: "Invalid email or password" })
    // }
    const role = 1

    return jsonResponse(200, {
      status: "logged_in",
      user: { username, role }
    })
  } catch (err) {
    console.error("loginHandler error:", err)
    return jsonResponse(500, { status: "error", message: "Could not log in" })
  }
}
