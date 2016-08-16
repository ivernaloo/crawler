'use strict';

var deduplicate = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var DATA, Queue, LIST_ID, REQUEST;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        Queue = {};
                        LIST_ID = [];
                        REQUEST = [];
                        _context.next = 5;
                        return getAll();

                    case 5:
                        DATA = _context.sent;

                        DATA.forEach(function (v, i) {
                            if (!Queue[v.name]) {
                                Queue[v.name] = 1;
                            } else {
                                ++Queue[v.name];
                                LIST_ID.push(v.objectId);
                            }
                        });

                        LIST_ID.forEach(function (v, i) {
                            REQUEST.push({
                                'method': "DELETE",
                                "path": _Store_Lcloud_ScrapeResource + v
                            });
                        });

                        console.log("REQUEST : ", REQUEST);
                        console.log("REQUEST : ", REQUEST.length);
                        request.post({
                            headers: Lcloud,
                            url: Store_Lcloud_Batch,
                            body: {
                                "requests": REQUEST
                            },
                            json: true
                        }, function (err, res, body) {
                            console.log("res statusCode : ", res.statusCode);
                            if (res.statusCode === 200) {
                                console.log("批量去重成功");
                            }
                        });

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function deduplicate() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var request = require('request');
var Store_Lcloud = 'https://api.leancloud.cn/1.1/classes/Post';
var Store_Lcloud_ScrapeResource = 'https://api.leancloud.cn/1.1/classes/ScrapeResource';
var _Store_Lcloud_ScrapeResource = '/1.1/classes/ScrapeResource/';
var Store_Lcloud_Base = 'https://api.leancloud.cn/1.1/';
var Store_Lcloud_Batch = "https://api.leancloud.cn/1.1/batch";
var Lcloud = {
    'X-LC-Id': "lvwj1mpo0ikouhkwl956kwqbnegzj9y5nh6ybs4qx2vmyc4z",
    'X-LC-Key': "fhkv9jj22qsvmfmhtkj84mxzn5oytuw8fpb9vkywz9docpet",
    'X-LC-Session': "qmdj8pdidnmyzp0c7yqil91oc"
};

var QueryString = {
    order: "-updatedAt"
};

// record the data
function record(data) {
    request.post({
        headers: Lcloud,
        url: Store_Lcloud_Batch,
        body: data,
        json: true
    }, function (err, res, body) {
        if (res.statusCode === 200) {
            console.log("记录数据成功");
        }
    });
};

function getAll(fn) {
    console.log("启动获取数据");
    return new Promise(function (resolve, reject) {
        request({
            headers: Lcloud,
            url: Store_Lcloud_ScrapeResource,
            method: "GET",
            qs: QueryString
        }, function (err, res, body) {
            if (res.statusCode === 200) {
                console.log("数据获取正确");
                return resolve(JSON.parse(res.body).results);
            } else {
                reject("Error: Some troubles on getAll");
            }
        });
    });
};

function batchDelete(data) {
    request.delete({
        headers: Lcloud,
        url: Store_Lcloud_Batch,
        body: data,
        json: true
    }, function (err, res, body) {
        if (res.statusCode === 200) {
            console.log("批量删除数据成功");
        }
    });
};
// deduplicateStorage()
function deduplicateStorage() {

    return;
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