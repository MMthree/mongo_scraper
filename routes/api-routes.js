var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var router = express.Router();

router.get("/scrape", function (req, res) {
        var verge = [];

    axios.get("https://theverge.com").then(function (response) {
        
        var $ = cheerio.load(response.data);


        $(".c-entry-box--compact--hero").each(function (i, element) {

            var title = $(element).find(".c-entry-box--compact__body h2").text();
            var image = $(element).find(".c-picture img").attr("src");

            verge.push({
                title,
                image
            });
        });
    });
    res.json("WHYYYYYYY")
});


module.exports = router;