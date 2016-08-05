var request = require('request');
var cheerio = require('cheerio');

var URL = require('url-parse');

var pageToVisit = "http://www.0daydown.com/category/tutorials/other";
var Store_Lcloud = 'https://api.leancloud.cn/1.1/classes/Post';
var Store_Lcloud_ScrapeResource = 'https://api.leancloud.cn/1.1/classes/ScrapeResource';
var Store_Lcloud_Base = 'https://api.leancloud.cn/1.1/';
var Store_Lcloud_Batch = "https://api.leancloud.cn/1.1/batch";
var Lcloud = {
    'x-avoscloud-application-id': "lvwj1mpo0ikouhkwl956kwqbnegzj9y5nh6ybs4qx2vmyc4z",
    'x-avoscloud-application-key': "fhkv9jj22qsvmfmhtkj84mxzn5oytuw8fpb9vkywz9docpet"
};
var QueryString = {
    limit : 50,
    order : "-updatedAt"
};
var _B_Exist_List = [],
    _A_Update_List = [],
    _Update_list = [];
getAll();


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
        // console.log("body : ", body);
        $('.excerpt header h2 a').each(function(i, v){
            var _url = $(v).attr("href"),
                _name = $(v).text();
            _list.push({
                "method": "POST",
                "path": "/1.1/classes/ScrapeResource",
                "body": {
                    "name": _name,
                    "url" : _url
                }
            });
        });
        // console.log("A data : ", _list);
        _A_Update_List = _list;
        _Update_list = diffArray(_A_Update_List, _B_Exist_List);

        record({
            "requests" : _Update_list
        });
    }
});

function record(data){
    request.post({
        headers: Lcloud,
        url: Store_Lcloud_Batch,
        body: data,
        json: true
    },function(err,res,body){
        // console.log("Update_ : ",JSON.parse(res.body).results);

        // console.log(err,body);
        // console.log(res.statusCode.toString())
        // console.log(res)
       // console.log("Err : ",err,"\nRes : ",res,"\nBody : ", body)
    });
}

function getAll(){
    console.log(".....");
    request({
        headers: Lcloud,
        url: Store_Lcloud_ScrapeResource,
        method: "GET",
        qs: QueryString
    },function(err,res,body){
        _B_Exist_List = JSON.parse(res.body).results;
        // console.log("B_ : ",JSON.parse(res.body).results);
        // console.log(JSON.parse(body).result);
        // console.log("getAll Status code: " + res.statusCode);
        // console.log("Err : ",err,"\nRes : ",res,"\nBody : ", body)
    });
}

/*
* 查找A中有，B中没有的
*@param a {Object}
* @param b {Object}
* */
function diffArray(a, b){
    return a.filter(function(current){
                return b.filter(function(current_b){
                        return current.body.url == current_b.url
                    }).length == 0
            });
}

