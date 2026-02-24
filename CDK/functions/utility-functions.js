import { runQuery, bootstrapDatabase } from "./db.js";

// Small helper to keep responses consistent
function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    body: JSON.stringify(payload)
  };
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
