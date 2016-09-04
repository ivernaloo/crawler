var request = require('request');
var cloud = require('./leancloud');
var Store_Lcloud_ScrapeResource = 'https://api.leancloud.cn/1.1/classes/crawler';
var _Store_Lcloud_ScrapeResource = '/1.1/classes/crawler/';
var Store_Lcloud_Base = 'https://api.leancloud.cn/1.1/';
var Store_Lcloud_Batch = "https://api.leancloud.cn/1.1/batch";
var Lcloud = {
    'X-LC-Id': "lvwj1mpo0ikouhkwl956kwqbnegzj9y5nh6ybs4qx2vmyc4z",
    'X-LC-Key': "fhkv9jj22qsvmfmhtkj84mxzn5oytuw8fpb9vkywz9docpet"
};
var async = require('async');
var LIST = [],
    COUNT = 0;

// queue 1 遍历数据
// 删除数据
async.whilst(
    function(){
        return typeof COUNT == "number"; // COUNT一直增加，到一定值时赋值为"end"跳出。
    },
    function (next){
        cloud.getListByPage(COUNT).then(
            function(res){
                if ( res.length && res.length > 0 ) {
                    LIST = LIST.concat(res);
                    console.log(COUNT, "组，加载ing");
                    COUNT ++;
                    next();
                } else {
                    COUNT = "end";
                    LIST =  arrayUnique(LIST);
                    console.log("重复元素的长度 ：", LIST.length);
                    if (LIST.length > 0){
                        batchDelete(LIST);    
                    }
                }

            },
            function(error){
                console.log("去重队列似乎有些问题！ " + error);
            }
        );
    }
);

function arrayUnique(Array) {
    var arr = {},
        b = [];
    for (var i = 0 , len = Array.length; i < len; i++){
        if ( arr[Array[i]['url']] ){
            b.push(Array[i].objectId);
        } else {
            arr[Array[i]['url']] = Array[i];
        }
    }

    delete arr;
    return b;
}


function batchDelete(idQueue){
    var REQUEST = [];
    
    idQueue.forEach(function(v, i){
        REQUEST.push({
            'method' : "DELETE",
            "path" : _Store_Lcloud_ScrapeResource + v
        })
    });
    
    request.post({
        headers: Lcloud,
        url: Store_Lcloud_Batch,
        body: {
            "requests" : REQUEST
        },
        json: true
    },function(err,res,body){
        console.log("res statusCode : ", res.statusCode);
        if (res.statusCode === 200) {
            console.log("批量去重成功")
        }
    });
};

