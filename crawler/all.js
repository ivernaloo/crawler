var async = require('async');
var config = require('../config');
var read = require('./read');
var save = require('./save');
var debug = require('debug')('blog:update:all');


var classList;
var articleList = [];

async.series([
    // queue 1
    // 依次获取所有文章分类下的文章列表
    function (done) {
        console.log("list");
        async.eachSeries(Object.keys(config.res), function(index, next){
            read.articleList(config.res[index], function (err, list) {
                articleList = articleList.concat(list);
                next(err);
            });
        }, done);

    },

    // queue 2
    // 重新整理资源列表，把重复的文章去掉
    function (done) {
        debug('整理文章列表，把重复的文章去掉');

        var articles = {};
        Object.keys(articleList).forEach(function (index) {
            articles[articleList[index].id] = articleList[index];
        });

        articleList = [];
        Object.keys(articles).forEach(function (id) {
            articleList.push(articles[id]);
        });

        done();
    },

    // queue 3
    // 保存资源列表
    function (done) {
        async.eachSeries(Object.keys(articleList), function (index, next) {
            save.article(articleList[index], next);
        }, done);
    }



], function (err) {
    if (err) console.error(err.stack);

    console.log('完成队列任务');
    console.log('存储数量 : ', articleList.length);
    process.exit(0);
});