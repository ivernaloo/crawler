var originRequest = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update:read');

var COUNT = 0;

/**
 * 请求指定URL
 *
 * @param {String} url
 * @param {Function} callback
 */
function request (url, callback) {
  originRequest(url, callback);
}


/**
 * 获取分类页面博文列表
 *
 * @param {String} url
 * @param {Function} callback
 */
exports.articleList = function (url, callback) {
  debug('读取博文列表：%s', url);

  request(url, function (err, res) {
    if (err) return callback(err);

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 读取博文列表
    var articleList = [];
    $('.container article').each(function () {
      var $me = $(this);
      var $title = $me.find('h2 a');
      var item = {
        title: $title.text().trim(),
        url:   $title.attr('href')
      };

      // 从URL中取出文章的ID
      var s = item.url.match(/.*\/(\d+)\.html/);
      if (Array.isArray(s)) {
        item.id = s[1];
        articleList.push(item);
      }
    });
    

    // 检查是否有下一页
    var nextUrl = $('.next-page a').attr('href');

    if (nextUrl && COUNT < 2) {
      ++COUNT;
      // 读取下一页
      exports.articleList(nextUrl, function (err, articleList2) {
        if (err) return callback(err);
        // 合并结果
        callback(null, articleList.concat(articleList2));
      });
    } else {
      // 返回结果
      callback(null, articleList);
    }
  });
};