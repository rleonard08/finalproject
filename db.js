const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
);

function getData(first, last, signature) {
    return db.query(
        "INSERT INTO signatures(first, last, signature) VALUES ($1, $2, $3) RETURNING id",
        [first, last, signature]
    );
}

//Collecting Users Signatures//
function getSignatures() {
    return db.query("SELECT * FROM signatures");
}

//Remember Returning Users//
function remUsers(id) {
    return db.query("SELECT signature FROM signatures WHERE id = $1", [id]);
}

//Registration Page//
function signUps(first, last, email, password) {
    return db.query(
        "INSERT INTO users(first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [first, last, email, password]
    );
}

exports.getData = getData;
exports.getSignatures = getSignatures;
exports.remUsers = remUsers;
exports.signUps = signUps;
