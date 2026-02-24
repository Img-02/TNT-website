// may need to install pg before we use this
// i dont have access to terminal so will do when i have
// all this is copied from the database lessons we did
import { Pool } from "pg"

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/tnt_news"
});

// Small helper to run queries
async function query(sql, params = []) {
  const result = await pool.query(sql, params);
  return result;
}

// test query
async function getAllUsers() {
  // TODO: replace this with a real query
  const result = await query(
    `SELECT * FROM users;`
  );

  return result.rows;
}

export const mockDatabase = {
  getAllUsers
}
