//Imports//////////////////////////////////////////////////////////////////////////////////////////////
import crypto from "crypto"
import { runQuery, bootstrapDatabase } from "./db.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  sql_getMainPageHandler_1,
  sql_getJournalistArticleHandler_2,
  sql_postLoginHandler_3,
  sql_getUserHandler_4,
  sql_postUserHandler_5,
  sql_putUserHandler_6,
  sql_getArticleHandler_7,
  sql_postArticleHandler_8,
  sql_putArticleHandler_9,
  sql_getEditorArticlesHandler_11
} from "./db-lambda-sql.js"

const staticImagesBucket = process.env.STATIC_IMAGES_BUCKET
const staticImageBaseUrl = process.env.STATIC_IMAGES_BASE_URL || ''
const awsRegion = process.env.AWS_REGION || 'eu-west-2'

const s3Client = new S3Client({ region: awsRegion })

// Functions //////////////////////////////////////////////////////////////////////////////////////////////

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(body)
})

export async function uploadImage (key, imageBytes) {
  if (!productCardsBucket) {
    throw new Error('PRODUCT_CARDS_BUCKET env var is not set')
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: productCardsBucket,
      Key: key,
      Body: Buffer.from(imageBytes),
      ContentType: 'image/jpg'
    })
  )

  const url = staticImageBaseUrl
    ? `${staticImageBaseUrl}/${key}`
    : `https://${staticImagesBucket}.s3.${awsRegion}.amazonaws.com/${key}`

  return { key, url }
}

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


  try {
    let articleId = event.articleId || event.queryStringParameters?.articleId || event.pathParameters?.articleId || 'NOT_SET'

    if (articleId == "NOT_SET") {
      return jsonResponse(404, { status: "error", message: "Article ID missing" })
    }

    console.log(`PARAMS: articleId = ${articleId}`)

    articleId = Number(articleId)

    const result = await runQuery(sql_getArticleHandler_7, { articleId })
    const rows = normaliseRows(result)

    const article = rows[0]

    if (!article) {
      console.error("Article ID not found in database")
      throw new Error;
    }

    return jsonResponse(200, {
      status: "success",
      article
    })
  }

  catch (error) {
    console.error(error)
    return jsonResponse(404, { status: "error ", message: "Failed to get article" })

  }
}

// gets user details (for specific user) from the data base //4
export const getUserProfileHandler = async (event, context) => {
  console.log('getUserDetails invoked')
  console.log(event)


  try {
    let userId = event.userId || event.queryStringParameters?.userId || event.pathParameters?.userId || 'NOT_SET'

    if (userId == "NOT_SET") {
      return jsonResponse(404, { status: "error", message: "User ID missing" })
    }

    console.log(`PARAMS: userId = ${userId}`)

    userId = Number(userId)

    const result = await runQuery(sql_getUserHandler_4, { userId })
    const rows = normaliseRows(result)

    const user = rows[0]

    if (!user) {
      console.error("User ID not found in database")
      throw new Error;
    }

    return jsonResponse(200, {
      status: "success",
      user
    })
  }

  catch (error) {
    console.error(error)
    return jsonResponse(404, { status: "error ", message: "Failed to get user data" })

  }
}

// GET articles journalist has written //2
export const getJournalistArticleHandler = async (event) => {
  console.log('getArticleHandler invoked')
  console.log(event)

  try {
    let article_journalist_id = event.article_journalist_id || event.queryStringParameters?.article_journalist_id || event.pathParameters?.article_journalist_id || 'NOT_SET'

    if (article_journalist_id == "NOT_SET") {
      return jsonResponse(404, { status: "error", message: "Article Journalist ID missing" })
    }

    console.log(`PARAMS: article_journalist_id = ${article_journalist_id}`)

    article_journalist_id = Number(article_journalist_id)
    const result = await runQuery(sql_getJournalistArticleHandler_2, { article_journalist_id })
    const articles = normaliseRows(result)

    if (!articles) {
      console.error("Article Journalist ID not found in database")
      throw new Error;
    }

    return jsonResponse(200, {
      status: "success",
      articles
    })
  }

  catch (error) {
    console.error(error)
    return jsonResponse(404, { status: "error ", message: "Failed to get article_journalist_id" })

  }
}

export const getEditorArticleHandler = async (event) => {
  console.log('getEditorHandler invoked')
  console.log(event)

  try {
    const result = await runQuery(sql_getEditorArticlesHandler_11)
    const articles = normaliseRows(result)

    if (!articles) {
      console.error("Article Journalist ID not found in database")
      throw new Error;
    }

    return jsonResponse(200, {
      status: "success",
      articles
    })
  }

  catch (error) {
    console.error(error)
    return jsonResponse(404, { status: "error ", message: "Failed to get article_journalist_id" })
  }
}

// Get articles to display on the main page //1
export const getMainPageArticlesHandler = async (event, context) => {
  console.log('getMainPageArticlesHandler invoked')
  console.log(event)
  console.log(context)
  try {
    const result = await runQuery(sql_getMainPageHandler_1);

    if (!result) {
      return jsonResponse(404, { status: "error", message: "Failed to get main page articles from database" })
    }

    const articles = normaliseRows(result)

    return jsonResponse(200, {
      status: "success",
      articles
    })
  }
  catch (error) {
    console.error(String(error))
    return jsonResponse(404, { status: "error", message: "Failed to get main page articles from database" })
  }
}

// PUT USER HANDLER
export const putUserHandler = async (event) => {
  console.log("putUserHandler invoked");
  console.log(event);

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    console.log("Parsed body:", body);

    const userId = Number(body.userId);

    if (!userId) {
      return jsonResponse(400, { 
        status: "error", 
        message: "Missing User ID" 
      });
    }

    const user_id = rows[0].user_id
    console.log(user_id)

    const result = await runQuery(sql_putUserHandler_6, {
      userId,
      user_first_name,
      user_surname,
      user_username,
      user_password,
      user_email,
      user_profile_pic_path,
      user_role_id
    });

    const rows = normaliseRows(result);
    const updatedRow = rows?.[0];

    console.log("Updated row:", updatedRow);

    if (!updatedRow || !updatedRow.user_id) {
      throw new Error("User not updated correctly");
    }

    return jsonResponse(200, {
      status: "success",
      user_id: updatedRow.user_id
    });

  } catch (error) {
    console.error("putUserHandler error:", error);

    return jsonResponse(500, {
      status: "error",
      message: "Failed to update user"
    });
  }
};


//handler for updating article website/database //9
export const putArticleHandler = async (event) => {
  console.log('putArticleHandler invoked')
  console.log(event)

  try {

    const body = event.body ? JSON.parse(event.body) : {}
    const articleId = Number(body.articleId)

    if (!articleId) {
      return jsonResponse(404, { status: "error", message: "Article ID missing" })
    }

    const article_title = body.article_title
    const article_summary = body.article_summary
    const article_text = body.article_text
    const article_submitted_at = body.article_submitted_at
    const article_published_at = body.article_published_at
    const article_historical_date = body.article_historical_date
    const article_rating = Number(body.article_rating)
    const article_image_path = body.article_image_path
    const article_status_id = Number(body.article_status_id)
    const article_journalist_id = Number(body.article_journalist_id)
    const article_editor_id = Number(body.article_editor_id)
    const article_draft_number = Number(body.article_draft_number)

    const result = await runQuery(sql_putArticleHandler_9, { articleId, article_title, article_summary, article_text, article_submitted_at, article_published_at, article_historical_date, article_rating, article_image_path, article_status_id, article_editor_id, article_journalist_id, article_draft_number })
    const rows = normaliseRows(result)

    const article_id = rows[0].article_id

    console.log(article_id)

    if (!article_id) {
      console.error("Article ID not found in database")
      throw new Error;
    }

    return jsonResponse(200, {
      status: "success",
      article_id
    })
  }

  catch (error) {
    console.error(error)
    return jsonResponse(404, { status: "error ", message: "Failed to update article" })

  }
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
export const postImageHandler = async (event) => {
  console.log("postImageHandler event:", JSON.stringify(event, null, 2));

  try {
    const qs = event.queryStringParameters || {};

    // fileName from client, e.g. "punch.jpg"
    const rawName = qs.fileName || "";

    // Very basic sanitising – keep only safe characters
    const safeName = rawName.replace(/[^a-zA-Z0-9._-]/g, "_") || `${Date.now()}-image.jpg`;

    // If you want them in a folder, do `const key = \`article-images/${safeName}\`;`
    const key = safeName;

    const command = new PutObjectCommand({
      Bucket: staticImagesBucket,
      Key: key,
      ContentType: "image/jpeg"
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });

    // Return both the presigned URL (for the PUT) and the key (for DB)
    return jsonResponse(200, {
      status: "success",
      uploadUrl,
      key
    });
  } catch (err) {
    console.error("postImageHandler error:", err);
    return jsonResponse(500, {
      status: "error",
      message: "Failed to create upload URL"
    });
  }
};

export const postArticleHandler = async (event) => {
  console.log(event);

  try {
    const body = event.body ? JSON.parse(event.body) : {};

    const article_title = body.article_title;
    const article_summary = body.article_summary;
    const article_text = body.article_text;
    const article_submitted_at = body.article_submitted_at;
    const article_published_at = body.article_published_at;
    const article_historical_date = body.article_historical_date;
    const article_rating = Number(body.article_rating);
    const article_image_path = body.article_image_path;
    const article_status_id = Number(body.article_status_id);
    const article_journalist_id = Number(body.article_journalist_id);
    const article_editor_id = Number(body.article_editor_id);
    const article_draft_number = Number(body.article_draft_number);

    console.log("DEBUG postArticleHandler body:", {
      article_image_path,
      type: typeof article_image_path,
    });

    const result = await runQuery(sql_postArticleHandler_8, {
      article_title,
      article_summary,
      article_text,
      article_submitted_at,
      article_published_at,
      article_historical_date,
      article_status_id,
      article_rating,
      article_image_path,
      article_journalist_id,
      article_editor_id,
      article_draft_number,
    });

    const rows = normaliseRows(result);
    const article_id = rows[0].article_id;

    if (!article_id) {
      console.error("article ID not found in database");
      throw new Error("Insert did not return article_id");
    }

    console.log("DEBUG postArticleHandler inserted article_id:", article_id);

    // 🔍 NEW: immediately read the row we just inserted
    const checkResult = await runQuery(
      `SELECT article_image_path
         FROM articles
        WHERE article_id = :article_id`,
      { article_id }
    );

    const checkRows = normaliseRows(checkResult) || [];
    console.log("DEBUG postArticleHandler DB check:", checkRows);

    return jsonResponse(200, {
      status: "success",
      article_id,
    });
  } catch (error) {
    console.error("postArticleHandler error:", error);
    return jsonResponse(404, {
      status: "error ",
      message: "Failed to post article",
    });
  }
};

//POST handler to allow user to login //3
// POST handler to allow user to login //3
export const postLoginHandler = async (event) => {
  console.log("postLoginHandler event body:", event.body);

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const username = body.username?.trim().toLowerCase();
    const password = body.password;

    if (!username || !password) {
      return jsonResponse(400, {
        status: "error",
        message: "Username and password are required"
      });
    }

    console.log("Logging in username:", username);

    const result = await runQuery(sql_postLoginHandler_3, { username });
    const rows = normaliseRows(result) || [];

    console.log("Login query rows:", rows);

    const userDetails = rows[0];

    // No such user
    if (!userDetails) {
      return jsonResponse(401, {
        status: "error",
        message: "Invalid username or password"
      });
    }

    const storedPasswordRaw = userDetails.user_password;
    let ok = false;

    // Try to parse as JSON (new users created via postUsersHandler)
    try {
      const parsed = JSON.parse(storedPasswordRaw);
      ok = verifyPassword(password, parsed);
    } catch (parseErr) {
      // If parse fails, treat it as a legacy plain text password (seed data)
      console.warn("Password is not JSON, falling back to plain text compare");
      ok = storedPasswordRaw === password;
    }

    if (!ok) {
      return jsonResponse(401, {
        status: "error",
        message: "Invalid username or password"
      });
    }

    const usernameToReturn = userDetails.user_username;
    const user_role = userDetails.user_role_id;
    const user_id = userDetails.user_id;

    return jsonResponse(200, {
      status: "logged_in",
      user: { user_username: usernameToReturn, user_role, user_id }
    });
  } catch (err) {
    console.error("postLoginHandler error:", err);
    return jsonResponse(500, {
      status: "error",
      message: "Could not log in"
    });
  }
};

// This handler gets is used when a user signs up //5
// This handler is used when a user signs up //5
export const postUsersHandler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};

    // Normalise email so log in is consistent
    const user_email = body.user_mail?.trim()?.toLowerCase();
    const password = body.user_password;
    const user_first_name = body.user_first_name?.trim();
    const user_surname = body.user_surname?.trim();
    const user_username = body.user_username?.trim().toLowerCase();

    const user_role_id = 1;

    // Basic validation
    if (!user_email || !password || !user_first_name || !user_surname || !user_username) {
      return jsonResponse(400, {
        status: "error",
        message: "Email, password, first name, surname and user name are required"
      });
    }

    const user_password = JSON.stringify(hashPassword(password));

    // For debugging if needed
    console.log("Creating user with:", {
      user_username,
      user_first_name,
      user_surname,
      user_email,
      user_role_id
    });

    await runQuery(sql_postUserHandler_5, {
      user_username,
      user_first_name,
      user_surname,
      user_email,
      user_password,
      user_role_id
    });

    return jsonResponse(201, {
      status: "created",
      user: { user_email, user_username }
    });
  } catch (err) {
    console.error("postUsersHandler error:", err);

    // If Aurora complains about unique constraint (duplicate email or username)
    const message = String(err?.message || "");
    const sqlState = err?.sqlState || err?.originalError?.sqlState;

    if (sqlState === "23505" || message.includes("duplicate key value")) {
      return jsonResponse(409, {
        status: "error",
        message: "A user with that email or username already exists"
      });
    }

    return jsonResponse(500, {
      status: "error",
      message: "Could not create user"
    });
  }
};

////////////////////////////////////////////////////// ⋆. 𐙚˚࿔ WILL 𝜗𝜚˚⋆  /////////////////////////////////////////////////////////////////////////////////////////////////////


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



