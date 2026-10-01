
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

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);

INSERT INTO users (name, email)
VALUES
    ('John', 'john@example.com'),
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com');


INSERT INTO posts (title, content, user_id)
VALUES
    ('John Post 1', 'Content 1', 1),
    ('John Post 2', 'Content 2', 1),
    ('John Post 3', 'Content 3', 1),
    ('Alice Post 1', 'Content 4', 2),
    ('Alice Post 2', 'Content 5', 2),
    ('Bob Post 1', 'Content 6', 3);

SELECT
    posts.id,
    posts.title,
    posts.content,
    users.name AS author_name
FROM posts
JOIN users
    ON posts.user_id = users.id;

SELECT
    users.id,
    users.name,
    COUNT(posts.id) AS post_count
FROM users
JOIN posts
    ON users.id = posts.user_id
GROUP BY
    users.id,
    users.name
HAVING COUNT(posts.id) > 2;


//TASK 4D
BEGIN;
INSERT INTO users (name, email)
VALUES ('Transaction User', 'transaction@example.com')
RETURNING *;
INSERT INTO posts (title, content, user_id)
VALUES (
    'Transaction Post',
    'This post should be rolled back.',
    10
)
RETURNING *;
INSERT INTO users (name, email)
VALUES ('Duplicate User', 'transaction@example.com');//PostgreSQL will give an error similar as email is unique

ROLLBACK;

SELECT *
FROM users
WHERE email = 'transaction@example.com';

SELECT *
FROM posts
WHERE title = 'Transaction Post';


