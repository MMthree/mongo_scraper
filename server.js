var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content from Public directory
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars 
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// ROUTES 
var htmlRoutes = require("./routes/html.routes/html-routes.js");
var apiRoutes = require("./routes/api-routes.js")
app.use(htmlRoutes);
app.use("/api", apiRoutes);


// axios.get("https://theverge.com").then(function (response) {
        
//         var $ = cheerio.load(response.data);
//         var verge = [];

//         $(".c-entry-box--compact--hero").each(function (i, element) {

//             var title = $(element).find(".c-entry-box--compact__body h2").text();
//             var image = $(element).find(".c-picture img").attr("src");

//             console.log(title)
//             verge.push({
//                 title,
//                 image
//             });
//         });
//         console.log(verge)

//     });

// Start server 
app.listen(PORT, function() {
    console.log("Server listening on: Port " + PORT);
})