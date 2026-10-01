CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,

    FOREIGN KEY (post_id)
        REFERENCES posts(id),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);

INSERT INTO users (name, email)
VALUES ('John Doe', 'john@example.com')
RETURNING *;

INSERT INTO posts (title, content, user_id)
VALUES (
    'My First Post',
    'This is my first blog post.',
    1
)
RETURNING *;

INSERT INTO comments (content, post_id, user_id)
VALUES
    ('Great post!', 1, 1),
    ('Very helpful!', 1, 1);

SELECT
    posts.id,
    posts.title,
    posts.content,
    COUNT(comments.id) AS comment_count
FROM posts
LEFT JOIN comments
    ON posts.id = comments.post_id
WHERE posts.user_id = 1
GROUP BY
    posts.id,
    posts.title,
    posts.content;

UPDATE posts
SET title = 'My Updated First Post'
WHERE id = 1
RETURNING *;