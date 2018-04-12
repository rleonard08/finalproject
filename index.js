const express = require("express");
const app = express();
var hb = require("express-handlebars");
const db = require("./db");
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

app.get("/registration", function(req, res) {
    console.log("registration page working");
    res.render("registration", {});
});

app.post("/registration", function(req, res) {
    console.log("User Registration Data");
    let first = req.body.first;
});

app.get("/petition", function(req, res) {
    console.log("im working");
    res.render("petition", {});
});

app.post("/petition", function(req, res) {
    console.log("Getting User Data");
    let first = req.body.first;
    let last = req.body.last;
    let signature = req.body.signature;
    console.log();
    if (first && last && signature) {
        db.getData(first, last, signature).then(function(results) {
            console.log(results);
            req.session.signatureId = results.rows[0].id;
            res.redirect("/thankyou");
        });
    } else {
        res.render("petition", { err: true });
    }
});

app.get("/thankyou", function(req, res) {
    console.log(req.session.signatureId);
    db.remUsers(req.session.signatureId).then(function(results) {
        console.log(results);
        res.render("thankyou", {
            signature: results.rows[0].signature
        });
    });
    console.log("thanks for your sig");
});

app.get("/viewsigs", function(req, res) {
    console.log("view all supporters");
    console.log(db.getSignatures + "");
    db.getSignatures().then(function(results) {
        console.log(results);
        res.render("viewsigs", {
            sigsList: results.rows
        });
    });
});

// res.render(template name) {
//     people [ { result.rows }]
// }

app.listen(process.env.PORT || 8080),
    () => {
        console.log(`I'm Listening`);
    };

//user body parser
