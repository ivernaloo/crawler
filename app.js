var path = require('path');
var express = require('express');
var cloud = require('./data/leancloud');
var cron = require('./data/cron');
var config = require("./config");
var app = express();
var LIST;

cron.job.start(); // start crontribute

cloud.getListByPage().then(
    function(res){
        LIST = res
    },
    function(error){
        console.log("Error : getListByPage " + error);
    }
);



// 配置 express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/web', express.static(path.join(__dirname, 'web')));


// 网站首页
app.get('/', function(req, res, next){

    // articleListByClassId 的第一个参数是文章分类的 ID
    // 第二个参数是返回结果的开始位置
    // 渲染模板
    res.locals.List = LIST;
    res.locals.moment = require('moment');
    res.render('index');

    cloud.getListByPage().then(
        function(res){
            LIST = res
        },
        function(error){
            console.log("Error : getListByPage " + error);
        }
    );

    next();
});

// 翻页
app.get('/page/:id', function(req, res, next){
    res.locals.moment = require('moment');

    cloud.getListByPage(req.params.id).then(
        function(response){
            console.log("ok");
            res.locals.List = response;
            res.render('pagelist');
            next();
        },
        function(error){
            console.log("Error : getListByPage " + error);
        }
    );

});

app.listen(config.port, function(){
    console.log('服务器已启动 监听3000端口');
});