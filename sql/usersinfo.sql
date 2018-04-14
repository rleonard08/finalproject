CREATE TABLE usersinfo (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    age INTEGER,
    city VARCHAR(300),
    homepage VARCHAR(300)
)
