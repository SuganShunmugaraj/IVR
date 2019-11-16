const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const passport = require("passport");
const customerPassport = require("passport");
const path = require("path");

require("dotenv").config();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/assets", express.static("assets"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("error", function(error) {
    console.error("Database connection error:", error);
});

mongoose.connection.once("open", function() {
    console.log("Database connected");
});

mongoose.set("useCreateIndex", true);

require("./app/routes/index.js")(app);
require("./config/passport.config.js");

app.use(passport.initialize());
app.use(customerPassport.initialize());
app.listen(process.env.PORT, () => console.log("App listening port " + process.env.PORT));
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "dist"));
});

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
    next();
});

app.use(function(err, res) {
    if (err.name === "UnauthorizedError") {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    if (err.shouldRedirect) {
        res.render("myErrorPage");
    } else {
        res.status(err.statusCode);
        res.json({ "message": err.message });
    }
});