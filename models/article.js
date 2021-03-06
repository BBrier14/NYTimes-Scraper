//-----Requirements-----//
const mongoose = require("mongoose");

//-----Scheme Creation-----//
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summaryOne: {
    type: String,
    required: false
  },
  summaryTwo: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: []
});

//-----Export Schema-----//
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
