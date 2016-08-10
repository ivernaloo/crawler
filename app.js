var path = require('path');
var express = require('express');
var config = require("./config");
var app = express();

// 网站首页
app.get('/', function(req, res, next){
    // articleListByClassId 的第一个参数是文章分类的 ID
    // 第二个参数是返回结果的开始位置
    // 第三个参数是返回结果的数量
    res.send('Hello world!');
});

app.listen(config.port, function(){
    console.log('服务器已启动 监听3000端口');
});