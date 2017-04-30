var express = require("express");
var mongo = require("mongodb").MongoClient;

var app = express();
var port = process.env.PORT || 3000;
var mongoURL = "mongodb://localhost:27017/urlshortener";

var redirect = function(shortUrlSlug) {

} 

app.get("/:protocol//:longURL([a-zA-Z\.\-\/]{0,})", function(req, res) {
	console.log(req.params);
	var dbEntry = {};
	var isURL = true; //needs to be completed
	if(isURL) {
		var completeUrl = req.params.protocol + "//" + req.params.longURL;
		mongo.connect(mongoURL, function(err, db) {
		console.log("Connected to server");
		var shortURL = (Math.random() * (9999-1000) + 1000).toFixed(0);

		var collection = db.collection("shortURLs");

		collection.insert({"shortURL" : shortURL,
							"longURL": completeUrl}, function(err, result) {
								//console.log(result.ops);
								var dbEntry = {"short": result.ops[0].shortURL,
												"long": result.ops[0].longURL};
								res.send(dbEntry);
							});
			
			db.close();
		});
	}
});

app.get("/:shortUrlSlug([0-9]{4})", function(req, res) {
	mongo.connect(mongoURL, function(err, db) {
		var collection = db.collection("shortURLs");
		console.log(req.params.shortUrlSlug);

		collection.find({"shortURL": req.params.shortUrlSlug}).toArray(function(err, result) {
			if(err) throw err;
			res.redirect(result[0].longURL);
		})
		db.close();
	})

	//res.send("redirect should have been called");
});

app.listen(port, function(req, res) {
	console.log("App started at http://localhost:" + port);
});

// Need to find out how to hold off on returning from functions until the database opertions
// are finished