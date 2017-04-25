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
								console.log(result);
								dbEntry = result;
							})

		db.close();
	});

	return dbEntry;
};

/*
app.get("/:protocol//:subdomain.:domain.:extension", function(req, res) {
	*/
app.get("/:protocol//:longURL([a-zA-Z\.\-\/]{0,})", function(req, res) {
	console.log(req.params);
	var dbEntry = {};
	var isURL = false; //needs to be completed
	if(isURL) {
		dbEntry = createShortURL(req.params.longURL);
	}
	res.send(dbEntry);
});

app.listen(port, function(req, res) {
	console.log("App started at http://localhost:" + port);
});