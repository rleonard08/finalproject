const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/event"
);

//Registration Page//
function signUps(
    company,
    straße,
    plz,
    ort,
    titel,
    vorname,
    name,
    telefon,
    email
) {
    return db.query(
        "INSERT INTO registration(company, straße, plz, ort, titel, vorname, name, telefon, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
        [company, straße, plz, ort, titel, vorname, name, telefon, email]
    );
}

exports.signUps = signUps;
