var async = require('async');
var config = require('../config');
var read = require('./read');
var save = require('./save');
var debug = require('debug')('blog:update:all');


var classList;
var articleList = {};

async.series([
/*

  // queue 1
  // 获取文章分类列表
  function (done) {
    // 获取文章分类列表
    console.log("获取文章分类列表");
    read.classList(config.sinaBlog.url, function (err, list) {
      classList = list;
      done(err);
    });
  },

  // queue 2
  // 保存文章分类
  function (done) {
    console.log("保存文章分类");
    save.classList(classList, done)
  },
*/

  // queue 3
  // 依次获取所有文章分类下的文章列表
  function (done) {
    read.articleList(config.res.url, function (err, list) {
        articleList = list;
        done(err);
      });
  },
// queue 4
    // 保存文章列表
    function (done) {
        async.eachSeries(Object.keys(articleList), function (classId, next) {
            save.articleList(classId, articleList[classId], next);
        }, done);
    },
 /*

  // queue 5
  // 保存文章数量
  function (done) {
    async.eachSeries(Object.keys(articleList), function (classId, next) {
      save.articleCount(classId, articleList[classId].length, next);
    }, done);
  },*/

/*  // queue 6
  // 重新整理文章列表，把重复的文章去掉
  function (done) {
    debug('整理文章列表，把重复的文章去掉');

    var articles = {};
    Object.keys(articleList).forEach(function (classId) {
      articleList[classId].forEach(function (item) {
        articles[item.id] = item;
      });
    });

    articleList = [];
    Object.keys(articles).forEach(function (id) {
      articleList.push(articles[id]);
    });

    done();
  }*/

], function (err) {
  if (err) console.error(err.stack);

  console.log('完成队列任务');
  process.exit(0);
});