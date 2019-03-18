var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var router = express.Router();
var db = require("./models");

router.get("/scrape", function (req, res) {

    axios.get("https://theverge.com").then(function (response) {
        
        var $ = cheerio.load(response.data);


        $(".c-entry-box--compact--hero").each(function (i, element) {
            var result = {};

            result.headline = $(this).find(".c-entry-box--compact__body h2").text();
            result.link = $(this).find(".c-entry-box--compact__title a").attr("href");
            result.image = $(this).find(".c-picture img").attr("src");
            result.saved = false;

            // verge.push({
            //     title,
            //     image,
            //     link
            // });
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
    });
    res.json("Scrape Complete")
});


module.exports = router;