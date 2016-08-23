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
  db.query('SELECT * FROM `article_list` WHERE `class_id`=? LIMIT 1',
      [listItem.id], function (err, data) {
        if (err) return;
        console.log("data : ", data)
        if (Array.isArray(data) && data.length >= 1) {
          // 文章存在，更新一下
          db.query('UPDATE `article_list` SET `title`=?, `url`=?, `class_id`=?',
              [listItem.title, listItem.url, listItem.id]);
        } else {
          // 文章不存在，添加
          db.query('INSERT INTO `article_list`(`id`, `title`, `url`) VALUES (?, ?, ?)',
              [listItem.id, listItem.title, listItem.url]);
        }
      });


};

/**
 * 保存文章分类的文章数量
 *
 * @param {Number} class_id
 * @param {Number} count
 * @param {Function} callback
 */
exports.articleCount = function (class_id, count, callback) {
  debug('保存文章分类的文章数量：%d, %d', class_id, count);

  db.query('UPDATE `class_list` SET `count`=? WHERE `id`=?', [count, class_id], callback);
};

/**
 * 保存文章标签
 *
 * @param {String} id
 * @param {Array} tags
 * @param {Function} callback
 */
exports.articleTags = function (id, tags, callback) {
  debug('保存文章标签: %s, %s', id, tags);

  // 删除旧的标签信息
  db.query('DELETE FROM `article_tag` WHERE `id`=?', [id], function (err) {
    if (err) return callback(err);

    if (tags.length > 0) {
      // 添加新标签信息
      // 生成SQL代码
      var values = tags.map(function (tag) {
        return '(' + db.escape(id) + ', ' + db.escape(tag) + ')';
      }).join(', ');

      db.query('INSERT INTO `article_tag`(`id`, `tag`) VALUES ' + values, callback);
    } else {
      // 如果没有标签，直接返回
      callback(null);
    }
  });
};

/**
 * 保存文章内容
 *
 * @param {String} id
 * @param {Array} tags
 * @param {String} content
 * @param {Function} callback
 */
exports.articleDetail = function (id, tags, content, callback) {
  debug('保存文章内容: %s', id);

  // 检查文章是否存在
  db.query('SELECT `id` FROM `article_detail` WHERE `id`=?', [id], function (err, data) {
    if (err) return callback(err);

    tags = tags.join(' ');
    if (Array.isArray(data) && data.length >= 1) {
      // 更新文章
      db.query('UPDATE `article_detail` SET `tags`=?, `content`=? WHERE `id`=?', [tags, content, id], callback);
    } else {
      // 添加文章
      db.query('INSERT INTO `article_detail`(`id`, `tags`, `content`) VALUES (?, ?, ?)', [id, tags, content], callback);
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