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

function getSignatures() {
    return db.query("SELECT * FROM signatures");
}

function remUsers(id) {
    return db.query("SELECT signature FROM signatures WHERE id = $1", [id]);
}

exports.getData = getData;
exports.getSignatures = getSignatures;
exports.remUsers = remUsers;
