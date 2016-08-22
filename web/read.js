var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:web:read');


/**
 * 获取文章分类列表
 *
 * @param {Function} callback
 */
exports.classList = function (callback) {
  debug('获取文章分类列表');

  db.query('SELECT * FROM `class_list` ORDER BY `id` ASC', callback); // sql语句 ASC升序 / DESC降序 - ascend/descend
};

/**
 * 获取指定分类下的文章列表
 *
 * @param {Number} classId
 * @param {Number} offset
 * @param {Number} limit
 * @param {Function} callback
 */
exports.articleListByClassId = function (classId, offset, limit, callback) {
  debug('获取指定分类下的文章列表：%s, %s, %s', classId, offset, limit);

  var sql = 'SELECT * FROM `article_list` AS `A`' +
            ' LEFT JOIN `article_detail` AS `B` ON `A`.`id`=`B`.`id`' +
            ' WHERE `A`.`class_id`=?' +
            ' ORDER BY `created_time` DESC LIMIT ?,?';
  db.query(sql, [classId, offset, limit], callback);
};

/**
 * 获取指定标签下的文章列表
 *
 * @param {String} tag
 * @param {Number} offset
 * @param {Number} limit
 * @param {Function} callback
 */
exports.articleListByTag = function (tag, offset, limit, callback) {
  debug('获取指定标签下的文章列表：%s, %s, %s', tag, offset, limit);

  var sql = 'SELECT * FROM `article_list` WHERE `id` IN (' +
            ' SELECT `id` FROM `article_tag` WHERE `tag`=?)' +
            ' ORDER BY `created_time` DESC LIMIT ?,?';
  db.query(sql, [tag, offset, limit], callback);
};

/**
 * 获取指定标签下的文章数量
 *
 * @param {String} tag
 * @param {Function} callback
 */
exports.articleCountByTag = function (tag, callback) {
  debug('获取指定标签下的文章数量：%s', tag);

  db.query('SELECT COUNT(*) AS `c` FROM `article_tag` WHERE `tag`=?', [tag], function (err, ret) {
    if (err) return callback(err);

    callback(null, ret[0].c);
  });
};