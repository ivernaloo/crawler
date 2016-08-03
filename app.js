var request = require('request');
var cheerio = require('cheerio');

var URL = require('url-parse');

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
        var data = {};
        var _list = [];
        $('.excerpt header a').each(function(i, v){
            var _url = $(v).attr("href"),
                _name = _url.split(/\/|\./).slice(-3,-1).join("");
            data[_name] = {
                "name" : $(v).text(),
                "url" : _url
            }
        });
        console.log(data)
        // record(data)
        // getAll();
    }
});

function record(data){
    request({
        headers: Lcloud,
        uri: Store_Lcloud,
        json: true,
        body: data,
        method: "POST"
    },function(err,res,body){
        // console.log(err)
        // console.log(res)
       // console.log("Err : ",err,"\nRes : ",res,"\nBody : ", body)
    });
}

function getAll(){
    request({
        headers: Lcloud,
        uri: Store_Lcloud,
        method: "GET"
    },function(err,res,body){
        console.log("getAll Status code: " + res.statusCode);
        // console.log("Err : ",err,"\nRes : ",res,"\nBody : ", body)
    });
}