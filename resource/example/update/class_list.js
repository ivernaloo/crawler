/*
* 拿到文章列表
* 这里是无限循去获取所有的结果
* */
var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update');

debug('读取博文列表');

/*
* callback 处理错误的回调函数
* */
function readArticleList (url, callback) {
    // 读取分类页面
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

        console.log("ArticleList : ", articleList);

        // 检查是否有下一页
        var nextUrl = $('.next-page a').attr('href');
        if (nextUrl) {
            // 读取下一页
            readArticleList(nextUrl, function (err, articleList2) {
                if (err) return callback(err);

                // 合并结果
                callback(null, articleList.concat(articleList2));
            });
        } else {
            // 返回结果
            callback(null, articleList);
        }
    });
}

readArticleList('http://www.0daydown.com/category/tutorials/web-design', function (err, articleList) {
    if (err) console.error(err.stack);
    console.log(articleList);
});