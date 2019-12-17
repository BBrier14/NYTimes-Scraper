//-----Requirements-----//
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const exphbs = require("express-handlebars")


//-----Connections and Set-Ups-----//
var PORT = 3000;
var app = express();

// app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("index", __dirname + "/views");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var results = [];

//-----Routes-----//


//-----Listener-----//
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  