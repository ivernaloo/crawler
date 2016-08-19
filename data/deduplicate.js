var DATA = require("./sample/sample").RAWDATA;
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
var LIST = [];
console.log("DATA : ", DATA);
/*
* 这种去重没有过滤数据是不完整的
* 1，是通过翻页，记录完整数据
* 2，离线下载全量数据
* 3，更新的时候，每个数据去验证有没有重复的(需要大量的查询CQL)
*
* */
function uniqueList(){
    cloud.getAll().then(
        function(res){
            LIST = res;
            console.log(" LIST : ", LIST);
            deduplicate(LIST);
        },
        function(error){
            console.log("Error : getAll " + error);
        }
    );
}
function deduplicate(DATA){
    var Queue = {};
    var LIST_ID = [];
    var REQUEST = [];

    console.log("进去去重状态");
    DATA.forEach(function(v,i){
        if ( !Queue[v.name] ) {
            Queue[v.name] = 1;        } else {
            ++ Queue[v.name];
            LIST_ID.push(v.objectId);
        }
    });

    LIST_ID.forEach(function(v, i){
        REQUEST.push({
            'method' : "DELETE",
            "path" : _Store_Lcloud_ScrapeResource + v
        })
    });
    console.log("去重数目：REQUEST : ", REQUEST.length);
    batchDelete(REQUEST)
}

function batchDelete(REQUEST){
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

function deduplicateStorage(){

    console.log("******************************");
    console.log("d : ", DATA);
    return ;
    /*
     request.post({
     headers: Lcloud,
     url: Store_Lcloud_Batch,
     body: {
     "requests" : REQUEST
     },
     json: true
     },function(err,res,body){
     if (res.statusCode === 200) {
     console.log("批量去重成功")
     }
     });
     */
}