//Imports//////////////////////////////////////////////////////////////////////////////////////////////

import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb"

import crypto from "crypto"
import { runQuery, bootstrapDatabase } from "./db.js";




// Functions //////////////////////////////////////////////////////////////////////////////////////////////

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(body)
})

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



// Normalise the result from data-api-client / RDS Data API
const normaliseRows = (result) => {
  if (!result) return []
  if (Array.isArray(result)) return result
  if (Array.isArray(result.rows)) return result.rows
  if (Array.isArray(result.records)) return result.records
  return []
}

const logInvocationDetails = (event, context) => {
  console.log("Event received:");
  console.log(JSON.stringify(event, null, 2));

  if (context) {
    console.log("Context received:");
    console.log({
      functionName: context.functionName,
      functionVersion: context.functionVersion,
      awsRequestId: context.awsRequestId,
      remainingTimeMs: context.getRemainingTimeInMillis()
    });
  }
};


////////////////////////////////////GET REQUESTS///////////////////////////////////////////////////////////

//GETs article information to display to user //7
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

// gets user details (for specific user) from the data base //4
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

// GET articles journalist has written //2
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


// Get articles to display on the main page //1
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

/////////////////////////////////////////////// PUT REQUESTS ////////////////////////////////////////////////////////////////////////////

// This handler is used to add information to the users profile info from their profile page //6
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


//handler for adding article to website/database //9
export const putArticleHandler = async (event) => {  
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

////////////////////POST REQUESTS/////////////////////////////////////////////////////////////

//handler for checking method  
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

//POST an image to DB //10
export const postImageHandler = async (event) => {
  console.log(event)
  const body = event.body ? JSON.parse(event.body) : {}
  const image_url = body.image_url

  if (!image_url) {
    return jsonResponse(500, { status: "error", message: "Missing image url" })
  }

  return jsonResponse(200, { status: "success", message: "Image uploaded to S3" })
}


// post articles to DB //8
export const postArticleHandler = async (event) => {
  try {

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

//POST handler to allow user to login //3
export const postLoginHandler = async (event) => {
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

// This handler gets is used when a user signs up //5
export const postUsersHandler = async (event) => {
  try {

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


    // if (existing.Item) {
    //   return jsonResponse(409, { status: "error", message: "User already exists" })
    // }


    // 2) Convert the raw password into a salted hash for storage
    const passwordData = hashPassword(password)

    // store the password in sql here

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

////////////////////////////////////////////////////// ⋆. 𐙚˚࿔ WILL 𝜗𝜚˚⋆  /////////////////////////////////////////////////////////////////////////////////////////////////////

// --- Will adding to get actual data from a db ----
export const getArticlesHandler = async (event, context) => {
  logInvocationDetails(event, context);

  try {
    const result = await runQuery(
      `
      SELECT
        article_id,
        article_title,
        article_summary,
        article_text,
        article_created_at,
        article_published_at,
        article_time_period,
        article_is_breaking,
        article_status_id,
        article_rating,
        article_image_path,
        article_journalist_id,
        article_editor_id
      FROM articles
      ORDER BY article_created_at DESC
      `
    );

    const rows = normaliseRows(result);

    return jsonResponse(200, {
      status: "ok",
      count: rows.length,
      articles: rows
    });
  } catch (err) {
    console.error("getArticlesHandler error:", err);

    return jsonResponse(500, {
      status: "error",
      message: "Failed to fetch articles"
    });
  }
};


// -------------------------
// BOOTSTRAP HANDLER
// -------------------------
export const bootstrapHandler = async (event, context) => {
  logInvocationDetails(event, context);

  try {
    const code = await bootstrapDatabase();

    return jsonResponse(code, {
      status: "ok",
      message: "Database reset and seeded with sample bakehouse data"
    });
  } catch (err) {
    console.error("bootstrapHandler error:", err);

    return jsonResponse(500, {
      status: "error",
      message: "Failed to bootstrap database"
    });
  }
};



