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
function record(data, callback){
    request.post({
        headers: Lcloud,
        url: Store_Lcloud_Batch,
        body: data,
        json: true
    },function(err,res,body){
        if (res.statusCode === 200) {
            console.log("记录数据成功");
            callback && callback(); // 执行回调
        }
    });
};

function getAll(id){
    if (!id) {
        // QueryString.skip = 100*id;
        id = 0;
    }
    return new Promise(function(resolve, reject){
        request({
            headers: Lcloud,
            url: Store_Lcloud_ScrapeResource,
            method: "GET",
            qs: {
                order : "-updatedAt",
                skip : 100 * id
            },
            useQuerystring: true
        },function(err,res,body){
            if (res.statusCode === 200){
                console.log("getAll - 数据获取正确");
                return resolve(JSON.parse(res.body).results);
            } else {
                reject("Error: Some troubles on getAll");
            }
        })
    });
};

/*
 * sample data : http://www.0daydown.com/08/606874.html
 * checkExist("http://www.0daydown.com/08/606874.html");
 * */
function checkExist(url, callback){
    if (!url) return;
    var _url = 'https://api.leancloud.cn/1.1/classes/crawler?where={"url":"' + url + '"}',
        _results = [],
        flag;

    request({
        headers: Lcloud,
        url: _url,
        method: "GET"
    },function(err,res,body){
        if (res.statusCode === 200){
            _results = JSON.parse(res.body).results;

            // detect the number of items
            if ( _results.length > 1){
                console.log("_results : ", _results);
                console.log("Length : ", _results.length);
                _results.splice(1).forEach(function(v, i){
                    deleteItem(v.objectId, function(){
                        callback(true);
                    }); // 删除重复的列表
                });

            } else {
                callback(false);
            }
        } else {
            throw SQLException("checkExist failure");
        }
    });

    return flag;
};

function deleteItem(id, callback){
    request.del({
        headers: Lcloud,
        url: Store_Lcloud_ScrapeResource + "/" + id
    },function(err,res,body){
        if (res.statusCode === 200) {
            console.log("删除数据" + id + "成功");
            callback && callback();
        }
    });
}

exports.record = record;
exports.getAll = getAll;
exports.checkExist = checkExist;
