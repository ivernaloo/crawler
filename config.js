// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host:            '127.0.0.1',   // 数据库地址
  port:            3306,          // 数据库端口
  database:        'sina_blog',   // 数据库名称
  user:            'root',        // 数据库用户
  password:        ''             // 数据库用户对应的密码
});

// 访问地址配置
// exports.sinaBlog = {
//   url: ''  // 网站地址
// };
// Web服务器端口
exports.port = 3000;

// 定时更新
exports.autoUpdate = '* */12 * * *';  // 任务执行规则，参考 cron 语法
