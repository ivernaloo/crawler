// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host:            '114.215.139.174',   // 数据库地址
  port:            '3306',          // 数据库端口
  database:        'crawler',   // 数据库名称
  user:            'root',        // 数据库用户
  password:        'root'             // 数据库用户对应的密码
});
// exports.db = mysql.createConnection({
//   host:            'localhost',   // 数据库地址
//   port:            '3306',          // 数据库端口
//   database:        'crawler',   // 数据库名称
//   user:            'user',        // 数据库用户
//   password:        'user'             // 数据库用户对应的密码
// });

// 博客配置
exports.res = [
  'http://www.0daydown.com/category/tutorials/web-design',  // 博客首页地址
  'http://www.0daydown.com/category/tutorials/%E7%A7%BB%E5%8A%A8app%E5%BC%80%E5%8F%91',  // 博客首页地址
  'http://www.0daydown.com/category/tutorials/other'  // 博客首页地址
];

// Web服务器端口
exports.port = 3001;

// 定时更新
exports.autoUpdate = '0 0/30 * * *';  // 任务执行规则，参考 cron 语法
