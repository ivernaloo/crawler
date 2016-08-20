// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host:            '114.215.139.174',   // 数据库地址
  port:            3306,          // 数据库端口
  database:        'crawler',   // 数据库名称
  user:            'root',        // 数据库用户
  password:        'root'             // 数据库用户对应的密码
});

// 博客配置
exports.sinaBlog = {
  url: 'http://blog.sina.com.cn/u/1776757314'  // 博客首页地址
};

// Web服务器端口
exports.port = 3001;

// 定时更新
exports.autoUpdate = '* */30 * * *';  // 任务执行规则，参考 cron 语法
