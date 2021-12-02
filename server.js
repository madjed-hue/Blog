const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articlesRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/blog");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    addedAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articlesRouter);

app.listen(5000);
