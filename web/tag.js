var async = require('async');
var config = require('../config');
var word = require('./wordcount');
var read = require('./read');
var debug = require('debug')('blog:update:tag');
var fs = require('fs');


var sentence = "";
var articleList = [];

async.series([
    // queue 1
    // 依次获取所有文章分类下的文章列表
    function (done) {
        console.log("read list");
        read.articleListByClassId(0, 200, function (err, list) {
            if (err) return done(err);
            articleList = list;
            done();
        });
    },

    // queue 2
    // join sentence
    function (done) {
        async.eachSeries(Object.keys(articleList), function (index, next) {
            sentence += articleList[index].title;
            sentence += "\n";
            next();
        }, done);
    },

    // queue 3
    // count word
    function (done) {
         var rank = [];
        fs.writeFile("content.txt", new Buffer(sentence), function (err) {
            console.log(" write file ", err);
            done();
            if (err) throw err;
        });
        rank = word.count(sentence);
        console.log(rank.slice(0,60));
    }

], function (err) {
    if (err) console.error(err.stack);
    console.log('完成队列任务');
    process.exit(0);
});