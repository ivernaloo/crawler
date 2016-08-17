var request = require('request');
var Store_Lcloud_ScrapeResource = 'https://api.leancloud.cn/1.1/classes/crawler';
var _Store_Lcloud_ScrapeResource = '/1.1/classes/crawler/';
var Store_Lcloud_Base = 'https://api.leancloud.cn/1.1/';
var Store_Lcloud_Batch = "https://api.leancloud.cn/1.1/batch";
var Lcloud = {
    'X-LC-Id': "lvwj1mpo0ikouhkwl956kwqbnegzj9y5nh6ybs4qx2vmyc4z",
    'X-LC-Key': "fhkv9jj22qsvmfmhtkj84mxzn5oytuw8fpb9vkywz9docpet"
};

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
};
;

exports.record = record;
exports.getAll = getAll;
