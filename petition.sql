CREATE TABLE signatures (
    id SERIAL PRIMARY KEY,
    first VARCHAR(300) NOT NULL,
    last VARCHAR(300) NOT NULL,
    signature TEXT NOT NULL
);
