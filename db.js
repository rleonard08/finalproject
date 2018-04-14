const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
);

function getData(first, last, signature, id) {
    return db.query(
        "INSERT INTO signatures(first, last, signature, user_id) VALUES ($1, $2, $3, $4) RETURNING id",
        [first, last, signature, id]
    );
}

//User City, Age and Homepage//
function userProfile(age, city, homepage, user_id) {
    return db.query(
        "INSERT INTO usersinfo(age, city, homepage, user_id) VALUES ($1, $2, $3, $4)",
        [age, city, homepage, user_id]
    );
}

//Returning Users Logging In//
function returnUsr(email) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
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
exports.returnUsr = returnUsr;
exports.userProfile = userProfile;
