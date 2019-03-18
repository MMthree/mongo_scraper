var express = require("express");
var router = express.Router();
var db = require("../models/Index.js");


router.get("/", function (req, res) {

    db.Article.find({})
        .then(function(dbArticle) {
            var hbsobj = {Article: dbArticle}
                res.render("index", hbsobj);
        })
        .catch(function(err) {
            console.log(err);
        })


});

router.get("/saved-articles", function (req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
        var hbsobj = {Article: dbArticle}
            res.render("saved-articles", hbsobj);
    })
    .catch(function(err) {
        console.log(err);
    })
});

module.exports = router;