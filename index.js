const express = require("express");
const app = express();
var hb = require("express-handlebars");
const db = require("./db");
var bcrypt = require("bcryptjs");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");
app.use(express.static("./public"));
app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);
var cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: "a really hard to guess secret",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
//
// function hashPassword(plainTextPassword) {
//     return new Promise(function(resolve, reject) {
//         bcrypt.genSalt(function(err, salt) {
//             if (err) {
//                 return reject(err);
//             }
//             bcrypt.hash(plainTextPassword, salt, function(err, hash) {
//                 if (err) {
//                     return reject(err);
//                 }
//                 resolve(hash);
//             });
//         });
//     });
// }
//
// function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
//     return new Promise(function(resolve, reject) {
//         bcrypt.compare(
//             textEnteredInLoginForm,
//             hashedPasswordFromDatabase,
//             function(err, doesMatch) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(doesMatch);
//                 }
//             }
//         );
//     });
// }

// //REGISTRATION PAGE//
// app.get("/registration", function(req, res) {
//     console.log("registration page working");
//     res.render("registration", {});
// });
//
// app.post("/registration", function(req, res) {
//     console.log("User Has Registered");
//     let first = req.body.first;
//     let last = req.body.last;
//     let email = req.body.email;
//     let password = req.body.password;
//     console.log(first, last, email, password);
//     if (first && last && email && password) {
//         hashPassword(password)
//             .then(function(hash) {
//                 return db.signUps(first, last, email, hash);
//             })
//             .then(function(results) {
//                 console.log(results, 7);
//                 req.session.user = {
//                     id: results.rows[0].id,
//                     first: req.body.first,
//                     last: req.body.last
//                 };
//                 res.redirect("/petition");
//             });
//     } else {
//         res.render("registration", { err: true });
//     }
// });

//More User Infomration//

// app.get("/moreinfo", function(req, res) {
//     console.log("Collecting Additional User Details");
//     res.render("moreinfo");
// });
//
// app.post("/moreinfo", function(req, res) {
//     console.log("Age, City, Homepage Details");
//     let age = req.body.age;
//     let city = req.body.city;
//     let homepage = req.body.homepage;
//     let user = req.session.user.id;
//     console.log(req.body);
//     if (age || city || homepage) {
//         db.userProfile(age, city, homepage, user).then(function(results) {
//             res.redirect("/petition");
//         });
//     }
// });

//Existing Users Login//
// app.get("/login", function(req, res) {
//     console.log("Login Page Loaded");
//     res.render("login", {});
// });
//
// app.post("/login", function(req, res) {
//     console.log("Welcome Back");
//     let email = req.body.email;
//     let password = req.body.password;
//     console.log(req.body);
//     if (email && password) {
//         db.returnUsr(email).then(function(results) {
//             console.log(req.body.password, results.rows[0].password);
//             checkPassword(req.body.password, results.rows[0].password).then(
//                 function(matches) {
//                     if (matches) {
//                         req.session.user = {
//                             id: results.rows[0].id,
//                             first: req.body.first,
//                             last: req.body.last
//                         };
//                         res.redirect("/viewsigs");
//                     } else {
//                         res.render("login", { err: true });
//                     }
//                 }
//             );
//         });
//     }
// });

// if matches true then run req.session.user if not send error
//Signature Page//
// app.get("/petition", function(req, res) {
//     console.log("Petition Page Loaded");
//     res.render("petition", {});
// });
//
// app.post("/petition", function(req, res) {
//     console.log("Getting User Data");
//     let first = req.session.user.first;
//     let last = req.session.user.last;
//     let signature = req.body.signature;
//     console.log(req.body);
//     if (first && last && signature) {
//         db
//             .getData(first, last, signature, req.session.user.id)
//             .then(function(results) {
//                 console.log(results);
//                 req.session.signatureId = results.rows[0].id;
//                 res.redirect("/thankyou");
//             })
//             .catch(function(err) {
//                 console.log(err);
//             });
//     } else {
//         res.render("petition", { err: true });
//     }
// });

// Thanks for Signing & View Your Signature//
// app.get("/thankyou", function(req, res) {
//     console.log(req.session.signatureId);
//     db.remUsers(req.session.signatureId).then(function(results) {
//         console.log(results);
//         res.render("thankyou", {
//             signature: results.rows[0].signature
//         });
//     });
//     console.log("thanks for your sig");
// });

//View List of People Who've Signed//
// app.get("/viewsigs", function(req, res) {
//     console.log("view all supporters");
//     console.log(db.getSignatures + "");
//     db.getSignatures().then(function(results) {
//         console.log(results);
//         res.render("viewsigs", {
//             sigsList: results.rows
//         });
//     });
// });

// res.render(template name) {
//     people [ { result.rows }]
// }

// NEW WEBSITE - FINAL PROJECT //
// MAIN LANDING PAGE //
app.get("/home", function(req, res) {
    console.log("Events Page Loaded");
    res.render("home", {});
});

// REGISTRATION PAGE //
app.get("/registration", function(req, res) {
    console.log("registration page working");
    res.render("registration", {});
});

app.post("/registration", function(req, res) {
    console.log("User Has Registered");
    let company = req.body.company;
    let straße = req.body.straße;
    let plz = req.body.plz;
    let ort = req.body.ort;
    let titel = req.body.titel;
    let vorname = req.body.vorname;
    let name = req.body.name;
    let telefon = req.body.telefon;
    let email = req.body.email;
    console.log(req.body);
    if (
        company &&
        straße &&
        plz &&
        ort &&
        titel &&
        vorname &&
        name &&
        telefon &&
        email
    ) {
        return db
            .signUps(
                company,
                straße,
                plz,
                ort,
                titel,
                vorname,
                name,
                telefon,
                email
            )
            .then(function(results) {
                console.log(results, 7);
                req.session.user = {
                    company: req.body.company,
                    straße: req.body.straße,
                    plz: req.body.plz,
                    ort: req.body.ort,
                    titel: req.body.titel,
                    vorname: req.body.vorname,
                    name: req.body.name,
                    telefon: req.body.telefon,
                    email: req.body.email
                };
                res.redirect("/thankyou");
            });
    } else {
        res.render("registration", { err: true });
    }
});

// Partners Page //
// app.get("/partners", function(req, res) {
//     console.log("Partners Page Loaded");
//     res.render("partners", {});
// });

// THANK YOU PAGE //
app.get("/thankyou", function(req, res) {
    console.log("Thank You Page Loading");
    res.render("thankyou", {});
});

// // Events Page //
// app.get("/events", function(req, res) {
//     console.log("Events Page Loaded");
//     res.render("events", {});
// });

app.listen(process.env.PORT || 8080, () => {
    console.log(`I'm Listening`);
});

//user body parser
