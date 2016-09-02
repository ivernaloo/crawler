var request = require('request');
var cheerio = require('cheerio');
var cloud = require('../data/leancloud');
var async = require('async');

var _URL = [
        "http://www.0daydown.com/category/tutorials/other"
      , "http://www.0daydown.com/category/tutorials/other/page/2"
      , "http://www.0daydown.com/category/tutorials/other/page/3"
      , "http://www.0daydown.com/category/tutorials/other/page/4"
      , "http://www.0daydown.com/category/tutorials/other/page/5"
      , "http://www.0daydown.com/category/tutorials/移动app开发"
      , "http://www.0daydown.com/category/tutorials/移动app开发/page/2"
      , "http://www.0daydown.com/category/tutorials/移动app开发/page/3"
      , "http://www.0daydown.com/category/tutorials/移动app开发/page/4"
      , "http://www.0daydown.com/category/tutorials/移动app开发/page/5"
      , "http://www.0daydown.com/category/tutorials/web-design"
      , "http://www.0daydown.com/category/tutorials/web-design/page/2"
      , "http://www.0daydown.com/category/tutorials/web-design/page/3"
      , "http://www.0daydown.com/category/tutorials/web-design/page/4"
      , "http://www.0daydown.com/category/tutorials/web-design/page/5"
];

async.series([
    function(done){
        async.eachSeries(Object.keys(_URL), function(index, next){
            crawler(encodeURI(_URL[index]), next);
        }, done);
    }
], function(err){
    if (err) console.error(err.stack);

    console.log('完成URL 列表遍历存储!');
});

function crawler(url, callbackup){
    var RESULTS = [];
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
                        cloud.checkExist(_list[index].body.url, function(flag){
                            if ( flag ) {
                                LIST.push(
                                    parseInt(index)
                                );
                            }
                            next();
                        })
                    }, function (){
                        console.log("_list 删除重复之前 : ", _list.length);
                        console.log("LIST : ", LIST);
                        if ( LIST.length > 0 ){
                            RESULTS =  _list.filter(function(item ,i){
                                return LIST.indexOf(i) == -1;
                            })
                        }
                        console.log("RESULTS 删除重复之后 : ", RESULTS.length);
                        done();
                    })
                },

                /*
                * queue 2
                * store the list
                * */
                function(done){
                    cloud.record({
                        "requests" : RESULTS
                    }, done);
                    console.log('存储数量 : ', RESULTS.length);
                }
            ], function(err){
                if (err) console.error(err.stack);

                console.log('完成队列');
                callbackup && callbackup();
                // process.exit(0);
            });
        }
    });
}

