var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:update:save');

/**
 * 保存文章列表
 *
 * @param {Number} index
 * @param {Array} listItem
 * @param {Function} callback
 */
exports.article = function (listItem, callback) {
  console.log("存储数据", listItem);

  // 查询文章是否已存在
  db.query('SELECT * FROM `article_list` WHERE `id`=? LIMIT 1',
      [listItem.id], function (err, data) {

        if (err) {
          console.log("err : ", err);
          callback();
          return;
        }
        if (Array.isArray(data) && data.length == 0) {
          console.log("add");
          // 文章不存在，添加
          db.query('INSERT INTO `article_list`(`id`, `title`, `url`) VALUES (?, ?, ?)',
              [listItem.id, listItem.title, listItem.url], callback);
        } else {
          callback();
        }
      });


};

/**
 * 检查文章是否存在
 *
 * @param {String} id
 * @param {Function} callback
 */
exports.isAericleExists = function (id, callback) {
  db.query('SELECT `id` FROM `article_detail` WHERE `id`=?', [id], function (err, data) {
    if (err) return callback(err);

    callback(null, Array.isArray(data) && data.length >= 1);
  });
};