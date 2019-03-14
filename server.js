var express = require("express");
var exphbs = require("express-handlebars");

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
var routes = require("./routes/html.routes/html-routes.js");
app.use("/", routes);

// Start server 
app.listen(PORT, function() {
    console.log("Server listening on: Port " + PORT);
})