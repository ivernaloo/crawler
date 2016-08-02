var request = require('request');
var cheerio = require('cheerio');
// var URL = require('url-parse');

var pageToVisit = "http://www.0daydown.com/category/tutorials/other";

request(pageToVisit, function(error, response, body) {
    if(error) {
        console.log("Error: " + error);
    }
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if(response.statusCode === 200) {
        // Parse the document body
        var $ = cheerio.load(body);
        $('.excerpt header a').each(function(i, v){
            console.log("[资源]:  " + $(v).text());
        });

    }
});