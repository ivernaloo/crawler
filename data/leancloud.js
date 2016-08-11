var request = require('request');
var Store_Lcloud = 'https://api.leancloud.cn/1.1/classes/Post';
var Store_Lcloud_ScrapeResource = 'https://api.leancloud.cn/1.1/classes/ScrapeResource';
var Store_Lcloud_Base = 'https://api.leancloud.cn/1.1/';
var Store_Lcloud_Batch = "https://api.leancloud.cn/1.1/batch";
var Lcloud = {
    'x-avoscloud-application-id': "lvwj1mpo0ikouhkwl956kwqbnegzj9y5nh6ybs4qx2vmyc4z",
    'x-avoscloud-application-key': "fhkv9jj22qsvmfmhtkj84mxzn5oytuw8fpb9vkywz9docpet"
};

var QueryString = {
    limit : 50,
    order : "-updatedAt"
};

// record the data
exports.record = function (data){
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

exports.getAll = function(fn){
    console.log("启动获取数据");
    request({
        headers: Lcloud,
        url: Store_Lcloud_ScrapeResource,
        method: "GET",
        qs: QueryString
    },function(err,res,body){
        if (res.statusCode === 200){
            console.log("数据获取正确");
            return JSON.parse(res.body).results;
        }
    });

}

