//var craigslist = require('craigslist');
var craigslist = require('./craigslist_api');
var fs = require("fs");
var jade = require('jade');
var render_profile_html = jade.compile(fs.readFileSync('jade_template/profile.jade'));
var util = require('util');
var express = require('express');
//var YQL = require('yql');
//var yql = new YQL();

var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: "QJ4JUDWqZMO4EEK7" }));


/*
var orig_query = "SELECT * FROM weather.forecast where (location = @zip)";

var query = "select * from craigslist.search where location=@loc and type=@type";
console.log(query);


new YQL.exec(query, function(response) {
	console.log("response: " + util.inspect(response));
	var location = response.query.results.channel.location,
		condition = response.query.results.channel.item.condition;
	
	console.log("The current weather in " + location.city + ", " +location.region + " is " + 
			condition.temp + " degrees and " + condition.text);

}, {"zip": 90066, "loc": "sfbay", "type": "sss"});
*/

var base_url = 'http://sfbay.craigslist.org/';
// this parses the HTML list, which doesn't include things like images and geo coordinates
//craigslist.getList('http://sfbay.craigslist.org/sfc/sss', function(error, listings) {
craigslist.getList(base_url + 'search/sfc/sss?hasPic=1', function(error, listings) {
	console.log("loading page");
	//console.log(listings);
	listings.forEach(function(listing) {
		//console.log("for each\n" + util.inspect(listing));
		craigslist.getListing(base_url + listing.url, function(error, oneList) {
			//console.log("oneList" + util.inspect(oneList));
		});
	});

	//listing.title;
	//listing.description;
	//listing.url;
	//listing.cities;
		
	//console.log(listing);
});
	


app.get('/', function (req, res) {
	console.log('session ' + util.inspect(req.session));
	console.log("request received: " + req);
});


// Launch app
var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

