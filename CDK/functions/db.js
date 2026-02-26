// functions/db.js
import client from "data-api-client";

import {
  sql00_dropAllTables,
  sql01_createGenresTable,
  sql02_createStatusesTable,
  sql03_createRolesTable,
  sql04_createUsersTable,
  sql05_createArticlesTable,
  sql06_createArticleGenresTable,
  sql07_createUserGenresTable,
  sql08_createCommentsTable,
  sql09_seedStatuses,
  sql10_seedGenres,
  sql11_seedRoles,
  sql12_seedUsers,
  sql13_seedArticles
} from "./db-bootstrap-sqls.js";

const connection = client({
  secretArn: process.env.SECRET_ARN || "NOT_SET",
  resourceArn: process.env.CLUSTER_ARN || "NOT_SET",
  database: process.env.DB_NAME || "NOT_SET"
});

export async function runQuery(sql, params = {}) {
  if (!sql || !sql.trim()) return;

  console.log("runQuery SQL:", sql);
  console.log("runQuery PARAMS:", JSON.stringify(params, null, 2));

  const result = await connection.query(sql, params);

  console.log("runQuery RESULT:", JSON.stringify(result, null, 2));

  return result;
}

export async function bootstrapDatabase() {
  const statements = [
    sql00_dropAllTables,
    sql01_createGenresTable,
    sql02_createStatusesTable,
    sql03_createRolesTable,
    sql04_createUsersTable,
    sql05_createArticlesTable,
    sql06_createArticleGenresTable,
    sql07_createUserGenresTable,
    sql08_createCommentsTable,
    sql09_seedStatuses,
    sql10_seedGenres,
    sql11_seedRoles,
    sql12_seedUsers,
    sql13_seedArticles
  ];

  for (const statement of statements) {
    await runQuery(statement);
  }

  return 201;
}
