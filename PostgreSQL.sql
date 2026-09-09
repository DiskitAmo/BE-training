CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(150),
is_active BOOLEAN
); 

INSERT INTO users (name, email, is_active, role)
VALUES
    ('John Doe', 'john@example.com', true,'admin'),
    ('Alice Smith', 'alice@example.com', true,'user'),
    ('Bob Johnson', 'bob@example.com', false,'admin'),
    ('Sarah Williams', 'sarah@example.com', true,'user'),
    ('Mike Brown', 'mike@example.com', false,'admin'),
	('Doe John', 'joh@example.com', true,'admin'),
    ('Alicey gorg', 'alicey@example.com', true,'user'),
    ('Boby John', 'boby@example.com', false,'admin'),
    ('Sara Will', 'sara@example.com', true,'user'),
    ('Miken Browny', 'miken@example.com', false,'admin');

SELECT * FROM users;
ALTER TABLE users
ADD COLUMN role VARCHAR(50);
INSERT INTO users (name, email, is_active, role)
VALUES
    ('John Doe', 'john@example.com', true,'admin'),
    ('Alice Smith', 'alice@example.com', true,'user'),
    ('Bob Johnson', 'bob@example.com', false,'admin'),
    ('Sarah Williams', 'sarah@example.com', true,'user'),
    ('Mike Brown', 'mike@example.com', false,'admin'),
	('Doe John', 'joh@example.com', true,'admin'),
    ('Alicey gorg', 'alicey@example.com', true,'user'),
    ('Boby John', 'boby@example.com', false,'admin'),
    ('Sara Will', 'sara@example.com', true,'user'),
    ('Miken Browny', 'miken@example.com', false,'admin');
SELECT * FROM users;
SELECT * FROM users WHERE role IS NULL;
DELETE FROM users WHERE role IS NULL;
SELECT * FROM users;
SELECT DISTINCT role FROM users; 
INSERT INTO users (name, email, is_active, role)
VALUES
    ('Rahul Sharma', 'rahul@example.com', true, 'moderator'),
    ('Priya Singh', 'priya@example.com', true, 'user'),
    ('Amit Kumar', 'amit@example.com', false, 'moderator'),
    ('Neha Verma', 'neha@example.com', true, 'user'),
    ('Rohan Mehta', 'rohan@example.com', false, 'moderator'),
    ('Anjali Gupta', 'anjali@example.com', true, 'moderator'),
    ('Vikas Joshi', 'vikas@example.com', true, 'user'),
    ('Sneha Kapoor', 'sneha@example.com', false, 'moderator'),
    ('Arjun Malhotra', 'arjun@example.com', true, 'admin'),
    ('Kavya Nair', 'kavya@example.com', true, 'moderator');
SELECT * FROM users;
SELECT DISTINCT role FROM users; 
INSERT INTO users (name, email, is_active, role)
VALUES ('John Sena', 'john@example.com', true, 'user')
RETURNING *;
SELECT * FROM users WHERE is_active = true;
SELECT * FROM users WHERE role = 'admin';
SELECT * FROM users WHERE role = 'admin' OR role = 'moderator';
SELECT * FROM users ORDER BY name;
SELECT * FROM users WHERE is_active = true ORDER BY name DESC LIMIT 10 OFFSET 5;
SELECT * FROM users;
UPDATE users SET
    name = 'Rahul Kumari',
    is_active = false,
    role = 'moderator'
WHERE id = 17 RETURNING *;
DELETE FROM users WHERE id = 5;


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200),
    content TEXT
);
INSERT INTO posts (user_id, title, content)
VALUES
    (25, 'Learning PostgreSQL', 'PostgreSQL is a relational database.'),
    (17, 'Learning Node.js', 'Node.js can connect to PostgreSQL.'),
    (17, 'My First Post', 'Hello everyone!'),
	 (11, 'Learning PostgreSQL 11', 'PostgreSQL is a relational database.'),
    (20, 'Learning Node.js 20', 'Node.js can connect to PostgreSQL.'),
    (21, 'My First Post 21', 'Hello everyone!') RETURNING *;
SELECT
    users.name,
    posts.title
FROM users
JOIN posts
    ON users.id = posts.user_id;

EXPLAIN ANALYZE
SELECT
    u.name,
	u.email,
    p.title
FROM users AS u
JOIN posts AS p
    ON u.id = p.user_id;

