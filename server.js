//-----Requirements-----//
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models")

//-----Connections and Set-Ups-----//
var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

//-----Routes-----//

//-----Listener-----//
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  