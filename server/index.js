"use strict";

// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://127.0.0.1:27017/tweeter";
const DataHelpers   = require("./lib/data-helpers.js");
const tweetsRoutes     = require("./routes/tweets");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let dbInstance;

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) throw err;

    console.log("Connected to the database");

    dbInstance = db;

    app.listen(PORT, () => {
        console.log("Example app listening on port " + PORT);
    });

    app.use("/", tweetsRoutes(DataHelpers(dbInstance)));
});
