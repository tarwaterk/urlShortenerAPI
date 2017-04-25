var express = require("express");
var mongo = require("mongodb").MongoClient;

var app = express();
var port = process.env.PORT || 3000;
var mongoURL = "mongodb://localhost:27017/urlshortener";

var createShortURL = function(longURL) {
	var dbEntry = {};

	mongo.connect(mongoURL, function(err, db) {
		console.log("Connected to server");
		var shortURL = (Math.random() * 10000).toFixed(0);

		var collection = db.collection("shortURLs");

		collection.insert({"shortURL" : shortURL,
							"longURL": longURL}, function(err, result) {
								//console.log(result.ops);
								dbEntry = result.ops;
								console.log(dbEntry);
							});
		
		db.close();
	});

	return dbEntry;
};

var redirect = function(shortUrlSlug) {

} 

app.get("/:protocol//:longURL([a-zA-Z\.\-\/]{0,})", function(req, res) {
	console.log(req.params);
	var dbEntry = {};
	var isURL = true; //needs to be completed
	if(isURL) {
		dbEntry = createShortURL(req.params.protocol + "//" + req.params.longURL);
	}
	res.send(dbEntry);
});

app.get("/:shortUrlSlug([0-9]{4})", function(req, res) {
	console.log(req.params.shortUrlSlug);

	res.send("redirect should have been called");
});

app.listen(port, function(req, res) {
	console.log("App started at http://localhost:" + port);
});

// Need to find out how to hold off on returning from functions until the database opertions
// are finished