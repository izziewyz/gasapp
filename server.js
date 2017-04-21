/* Showing Mongoose's "Populated" Method (18.3.8)
 * INSTRUCTOR ONLY
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var History = require("./models/History");
// Our scraping tools
var axios = require("axios");
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------
var databaseUri = 'mongodb://<myUserAdmin>:<abc123>@ds115071.mlab.com:15071/heroku_m8v5lfsj';
// MongoDB Configuration configuration (Change this URL to your own DB)


if (process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
} else{
  mongoose.connect(databaseUri);
};




//mongoose.connect("mongodb://localhost:27017/zoo");



var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  History.find({}).sort([
    ["date", "descending"]
  ]).limit(5).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
      console.log(doc);
    }
  });
});

app.get("/apisearch", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  History.find({}).sort([
    ["date", "descending"]
  ]).limit(3).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
      console.log(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
    //console.log("BODY: " + req.body.distancebetween);

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  History.create({
    // name: req.body.username,
    // email: req.body.contact,
    location1: req.body.location1,
    location2: req.body.location2,
    
    date: Date.now(),
    //distancebetween: req.body.distance,
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});