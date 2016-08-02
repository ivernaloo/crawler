var request = require('request');
var cheerio = require('cheerio');
// var URL = require('url-parse');

var pageToVisit = "http://www.0daydown.com/category/tutorials/other";
var Store_Lcloud = 'https://api.leancloud.cn/1.1/classes/ScrapeResource';
var Lcloud = {
    'x-avoscloud-application-id': "lvwj1mpo0ikouhkwl956kwqbnegzj9y5nh6ybs4qx2vmyc4z",
    'x-avoscloud-application-key': "fhkv9jj22qsvmfmhtkj84mxzn5oytuw8fpb9vkywz9docpet"
};

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

            record(data)
        });

    }
});

function record(data){
    request({
        headers: Lcloud,
        uri: Store_Lcloud,
        body: data,
        method: "POST"
    },function(err,res,body){
       console.log("Err : ",err,"\nRes : ",res,"\nBody : ", body)
    });
}