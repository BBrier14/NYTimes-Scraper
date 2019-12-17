//-----Requirements-----//
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const exphbs = require("express-handlebars")


//-----Connections and Set-Ups-----//
var PORT = process.env.PORT || 3000;
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

//--Main Scrape Route--//
app.get("/newsscrape", function (req, res){
  axios.get("https://www.nytimes.com/").then (function (response){
    var $ = cheerio.load(response.data)
    $("h2 span").each (function (i, element){
      var headline = $(element).text();
      var link = "https://www.nytimes.com";
            link = link + $(element).parents("a").attr("href");
            var summaryOne = $(element).parent().parent().siblings().children("li:first-child").text();
            var summaryTwo = $(element).parent().parent().siblings().children("li:last-child").text();

            if (headline && summaryOne && link) {
              results.push({
                headline: headline,
                summaryOne: summaryOne,
                summaryTwo: summaryTwo,
                link: link
              })
            }

    });
    db.Article.create(results)
    .then(function (dbArticle){
      res.render("index", { dbArticle });
      console.log(dbArticle)
    })
    .catch(function (err){
      console.log(err);
    })
    app.get("/", function (req, res){
      res.render("index")
    })
  })
});

//--First Update Route--//
app.put("/update/:id", function (req, res){
  db.Article.updateOne({__id: req.params.id}, { $set: {saved: true}}, function (err, result){
    if (result.changedRows == 0){
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//--Second Update Route--//
app.put("/unsave/:id", function(req, res){
  console.log(req.body);
  db.Article.updateOne({__id: req.params.id}, { $set: { saved: false}}, function(err, result){
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//--Third Update Route (New Note)--//
app.put("/newnote/:id", function(req, res){
  console.log(req.body);
  console.log(req,body.__id);
  console.log(req.body.note);
  db.Article.updateOne({__id: req.body.__id}, { $push: { note: req.body.note }}, function(err, result){
    console.log(result);
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else [
      res.status(200).end()
    ]
  });
});

//--Get Route (Saved)--//
app.get("/saved", function (req, res){
  var savedArticles = [];
  db.Article.find({ saved: true }, function (err,saved){
    if (err) throw err;
    savedArticles.push(saved)
    res.render("saved", {saved})
  });
});



//-----Listener-----//
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  