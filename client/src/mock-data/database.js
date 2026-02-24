// may need to install pg before we use this
// i dont have access to terminal so will do when i have
// all this is copied from the database lessons we did


const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/tnt_news"
});

// Small helper to run queries
async function query(sql, params = []) {
  const result = await pool.query(sql, params);
  return result;
}
