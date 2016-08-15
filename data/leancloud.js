require("babel-polyfill");

var request = require('request');
var Store_Lcloud = 'https://api.leancloud.cn/1.1/classes/Post';
var Store_Lcloud_ScrapeResource = 'https://api.leancloud.cn/1.1/classes/ScrapeResource';
var _Store_Lcloud_ScrapeResource = '/1.1/classes/ScrapeResource/';
var Store_Lcloud_Base = 'https://api.leancloud.cn/1.1/';
var Store_Lcloud_Batch = "https://api.leancloud.cn/1.1/batch";
var Lcloud = {
    'x-avoscloud-application-id': "lvwj1mpo0ikouhkwl956kwqbnegzj9y5nh6ybs4qx2vmyc4z",
    'x-avoscloud-application-key': "fhkv9jj22qsvmfmhtkj84mxzn5oytuw8fpb9vkywz9docpet"
};
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var QueryString = {
    order : "-updatedAt"
};

// record the data
function record(data){
    request.post({
        headers: Lcloud,
        url: Store_Lcloud_Batch,
        body: data,
        json: true
    },function(err,res,body){
        if (res.statusCode === 200) {
            console.log("记录数据成功")
        }
    });
};

function getAll(fn){
    console.log("启动获取数据");
    return new Promise(function(resolve, reject){
        request({
            headers: Lcloud,
            url: Store_Lcloud_ScrapeResource,
            method: "GET",
            qs: QueryString
        },function(err,res,body){
            if (res.statusCode === 200){
                console.log("数据获取正确");
                return resolve(JSON.parse(res.body).results);
            } else {
                reject("Error: Some troubles on getAll");
            }
        })
    });
};

function batchDelete(data){
    request.delete({
        headers: Lcloud,
        url: Store_Lcloud_Batch,
        body: data,
        json: true
    },function(err,res,body){
        if (res.statusCode === 200) {
            console.log("批量删除数据成功")
        }
    });
};
// deduplicateStorage()
function deduplicateStorage(){
    var REQUEST = [];
    
        id.forEach(function(v, i){
            REQUEST.push({
                'method' : "DELETE",
                "path" : _Store_Lcloud_ScrapeResource + v
            })
        });
        console.log("REQUEST : ", REQUEST);

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
};

async function deduplicate(){
    var DATA;
    var Queue = {};
    var LIST_ID = [];

    DATA = await getAll();
    DATA.forEach(function(v,i){
        if ( !Queue[v.name] ) {
            Queue[v.name] = 1;
        } else {
            ++ Queue[v.name];
            LIST_ID.push(v.objectId);
        }
    });

    return {
        "queue" : Queue,
        "id": LIST_ID
    };
};

console.log(" abc : ", deduplicate());
exports.record = record;
exports.getAll = getAll;
