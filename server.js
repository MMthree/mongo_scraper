var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();


// Serve static content from Public directory
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDb
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/surge_db";
mongoose.connect(MONGODB_URI);

// Handlebars 
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// ROUTES 
var htmlRoutes = require("./routes/html-routes.js");
var apiRoutes = require("./routes/api-routes.js")
app.use(htmlRoutes);
app.use("/api", apiRoutes);


// Start server 
app.listen(PORT, function() {
    console.log("Server listening on: Port " + PORT);
})