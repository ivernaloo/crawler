var request = require('request');
var cheerio = require('cheerio');
var cloud = require('../data/leancloud');
var URL = require('url-parse');

var URL = ["http://www.0daydown.com/category/tutorials/other"
    , "http://www.0daydown.com/category/tutorials/移动app开发"
    , "http://www.0daydown.com/category/tutorials/web-design"]

var _B_Exist_List = [],
    _A_Update_List = [],
    _Update_list = [];

cloud.getAll().then(
    function(res){
        _B_Exist_List = res
    },
    function(error){
        console.log("Error : getAll " + error);
    }
);

//@todo 做一个遍历抓取
var COUNT = 1;
var SI = setInterval(function(){
    if ( COUNT < 4 ) {
        crawler(encodeURI(URL[COUNT-1]));
        COUNT++
    } else {
        clearInterval(SI);
    }
}, 2000)

function crawler(url){
    // request the target url
    request(url, function(error, response, body) {
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
                    "path": "/1.1/classes/crawler",
                    "body": {
                        "name": _name,
                        "url" : _url
                    }
                });
            });
            // console.log("A data : ", _list);
            _A_Update_List = _list;
            _Update_list = diffArray(_A_Update_List, _B_Exist_List);
            console.log(" Update LIST ", _Update_list, " Number : ", _Update_list.length);

            cloud.record({
                "requests" : _Update_list
            });
        }
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
