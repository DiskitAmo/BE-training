const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function getUserWithPosts(userId) {
  const result = await pool.query(
    `
    SELECT
      users.id AS user_id,
      users.name AS user_name,
      users.email,
      posts.id AS post_id,
      posts.title,
      posts.content
    FROM users
    LEFT JOIN posts
      ON users.id = posts.user_id
    WHERE users.id = $1
    `,
    [userId],
  );

  return result.rows;
}
async function run() {
  try {
    const posts = await getUserWithPosts(1);

    console.log(posts);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

run();
