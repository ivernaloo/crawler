var path = require('path');
var express = require('express');
var cloud = require('./data/leancloud');
var config = require("./config");
var app = express();
var LIST;

cloud.getAll().then(
    function(res){
        LIST = res
    },
    function(error){
        console.log("Error : getAll " + error);
    }
);


// 配置 express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 网站首页
app.get('/', function(req, res, next){
    // articleListByClassId 的第一个参数是文章分类的 ID
    // 第二个参数是返回结果的开始位置
    // 渲染模板
    console.info("list : ", LIST);
    res.locals.List = LIST;
    res.locals.moment = require('moment');
    res.render('index');
});

app.listen(config.port, function(){
    console.log('服务器已启动 监听3000端口');
});