const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");

function getData(first, last, signature) {
    return db.query(
        "INSERT INTO signatures(first, last, signature) VALUES ($1, $2, $3) RETURNING id",
        [first, last, signature]
    );
}

function getSignatures() {
    return db.query("SELECT * FROM signatures");
}

exports.getData = getData;
exports.getSignatures = getSignatures;
