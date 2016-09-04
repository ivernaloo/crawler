var async = require('async');
var config = require('../../config');
var word = require('./wordcount');
var read = require('../../web/read');
var debug = require('debug')('blog:update:tag');
var fs = require('fs');


var sentence = "";
var articleList = [];

var LIST = [],
    RANK = {},
    COUNT = 0;


async.series([
    // queue 1 遍历数据
    // 拿到所有数据
    function (done) {
        async.whilst(
            function(){
                return typeof COUNT == "number"; // COUNT一直增加，到一定值时赋值为"end"跳出。
            },
            function (next){

                read.articleListByClassId(200 * COUNT, 200, function (err, res) {
                    if (err) return done(err);
                    if ( res.length && res.length > 0 ) {
                        res.forEach(function(v, i){
                            RANK = word.dict(res[i].title, RANK);
                        })
                        COUNT++;
                        next();
                    } else {
                        COUNT = "end";
                        RANK = word.transformRankArray(RANK);
                        // console.log("RANK : ", RANK.slice(0,100));
                        done();
                    }
                });
            }
        );
    },

    // queue 2
    // write result
    function (done) {
         var rank = [];
        fs.writeFile("./tag/rank.txt", new Buffer(JSON.stringify({ list : RANK.slice(0,200)})), function (err) {
            console.log(" write file ", err);
            done();
            if (err) throw err;
        });
    }

], function (err) {
    if (err) console.error(err.stack);
    console.log('完成队列任务');
    process.exit(0);
});

