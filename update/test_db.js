var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');
var debug = require('debug')('blog:update');

// 创建数据库连接
var db = mysql.createConnection({
    host:            '114.215.139.174',   // 数据库地址
    port:            3306,          // 数据库端口
    database:        'crawler',   // 数据库名称
    user:            'root',        // 数据库用户
    password:        'root'             // 数据库用户对应的密码
});

/**
 * 保存文章分类
 *
 * @param {Object} data
 * @param {Function} callback
 */
function saveClassItem (data, callback) {
    // 查询分类是否已存在
    db.query('SELECT * FROM `class_list` WHERE `id`=? LIMIT 1', [data.id], function (err) {
        if (err) return next(err);

        if (Array.isArray(data) && data.length >= 1) {
            // 分类已存在，更新一下
            db.query('UPDATE `class_list` SET `name`=?, `url`=? WHERE `id`=?', [data.name, data.url, data.id], callback);
        } else {
            // 分类不存在，添加
            db.query('INSERT INTO `class_list`(`id`, `name`, `url`) VALUES (?, ?, ?)', [data.id, data.name, data.url], callback);
        }
    });
}
console.log("DB Connection");
// 显示所有数据表
db.query('show tables', function (err, tables) {
    console.log("Query");
    if (err) {
        console.error(err.stack);
    } else {
        console.log(tables);
    }

    // 关闭连接
    db.end();
});