const pool = require('./config/db.js');

async function test() {
  try {
    const res = await pool.query(
      "INSERT INTO messages (intent, message, reply, timestamp) VALUES ($1, $2, $3, $4) RETURNING *",
      ["general_chat", "test_msg", "test_reply", new Date().toISOString()]
    );
    console.log("Insert success:", res.rows[0]);
  } catch (e) {
    console.error("Insert failed:", e.message);
  } finally {
    process.exit(0);
  }
}
test();
