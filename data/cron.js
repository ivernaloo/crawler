var cronJob = require('cron').CronJob;
var path = require('path');
var config = require('../config');
var spawn = require('child_process').spawn;


// 定时执行更新任务
module.exports.job = new cronJob(config.autoUpdate, function () {
    console.log('开始执行定时更新任务');
    console.log(process.execPath);
    var update = spawn(process.execPath, [path.resolve(__dirname, '../crawler/app.js')]);
    update.stdout.pipe(process.stdout);
    update.stderr.pipe(process.stderr);
    update.on('close', function (code) {
        console.log('更新任务结束，代码=%d', code);
    });
});

