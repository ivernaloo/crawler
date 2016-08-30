var request = require('request');
var cheerio = require('cheerio');
var cloud = require('../data/leancloud');
var async = require('async');

var _URL = ["http://www.0daydown.com/category/tutorials/other"
    , "http://www.0daydown.com/category/tutorials/移动app开发"
    , "http://www.0daydown.com/category/tutorials/web-design"]

// var COUNT = 0;
// var SI = setInterval(function(){
//     if ( COUNT < 1 ) {
//         crawler(encodeURI(_URL[COUNT]));
//         COUNT++
//     } else {
//         clearInterval(SI);
//     }
// }, 2000);

async.series([
    function(done){
        async.eachSeries(Object.keys(_URL), function(index, next){
            console.log("index : ", index)
            crawler(encodeURI(_URL[index]), next);
        }, done);
    }

], function(err){
    if (err) console.error(err.stack);

    console.log('完成URL 列表遍历存储!');
    process.exit(0);
});





function crawler(url, callback){
    console.log(" 开始 crawler 抓取 " + url);
    // request the target url
    request(url, function(error, response, body) {
        console.log("crawler 抓取 " + url);

        if(error) {
            console.log("Error: " + error);
        }
        // Check status code (200 is HTTP OK)

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

            async.series([
                /*
                * queue 1
                * filter the exist item from the list
                * */
                function(done){
                    var LIST = [];
                    async.eachSeries(Object.keys(_list), function(index, next){
                        console.log("length : ", _list.length);
                        // console.log("_list : ", _list);
                        // console.log("index : ", index);
                        // console.log("item : ", _list[index]);
                        // console.log("url : ", _list[index].body.url);
                        // todo: 修复检查与否的逻辑
                        cloud.checkExist(_list[index].body.url, function(flag){
                            // true 删除多余的的元素
                            if ( flag ) {
                                console.log("重复的游标 :", index);
                                LIST.push(index);
                            }
                            next();
                        })
                    }, function(){
                        console.log("list : ", LIST);
                        done();
                    })
                },

                /*
                * queue 2
                * store the list
                * */
                function(done){
                    cloud.record({
                        "requests" : _list
                    }, done);
                }
            ], function(err){
                if (err) console.error(err.stack);

                console.log('完成单页数据存储');
                console.log('存储数量 : ', _list.length);

                callback && callback();
                process.exit(0);
            });
        }
    });
}

