var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var router = express.Router();
var db = require("../models/Index.js");

router.get("/scrape", function (req, res) {

    axios.get("https://theverge.com").then(function (response) {
        
        var $ = cheerio.load(response.data);


        $(".c-entry-box--compact--hero").each(function (i, element) {
            var result = {};

            result.headline = $(this).find(".c-entry-box--compact__body h2").text();
            result.link = $(this).find(".c-entry-box--compact__title a").attr("href");
            result.image = $(this).find(".c-picture img").attr("src");
            result.saved = false;

            db.Article.create(result)
                .then(function(dbArticle) {
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
    });
    res.json("Scrape Complete")
});

router.get("/articles/:id", function (req, res){
    db.Article.findOne({_id: req.params.id})
    .populate("comment")
    .then(function (dbArticle) {
        res.json(dbArticle)
    }).catch(function (err) {
        console.log(err);
    });
});

// Moves Article from index page to saved-articles
router.post("/articles/:id", function (req, res) {
    db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {saved: true}})
    .then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        console.log(err);
    });
});

// Remove articles that have been saved
router.post("/saved/articles/:id", function (req, res) {
    db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {saved: false}})
    .then(function () {
        res.json({msg: "Removed from saved articles"})
    }).catch(function (err) {
        console.log(err);
    });
});

// Save comment added to saved article
router.post("/comment/:id", function (req, res) {
    db.Comment.create({name: req.body.name, text: req.body.text})
        .then(function(dbComment) {
        return db.Article.findOneAndUpdate({_id: req.params.id}, {comment: dbComment._id}, {new: true});
        }).then(function (dbArticle) {
            res.json(dbArticle)
        }).catch(function (err) {
            console.log(err);
        });
});   

// Delete all articles that have not been saved
router.delete("/clear", function (req, res) {
    db.Article.deleteMany({saved: false})
        .then(function() {
            res.json({msg: "deleted all non saved articles"})
        }).catch(function (err) {
            console.log(err);
        });
});



module.exports = router;