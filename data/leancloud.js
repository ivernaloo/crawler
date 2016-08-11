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

function deduplicate(){
    var DATA =  [
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.568Z",
            "updatedAt": "2016-08-11T03:43:05.568Z",
            "objectId": "57abf449c4c97100545f5c32"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.555Z",
            "updatedAt": "2016-08-11T03:43:05.555Z",
            "objectId": "57abf449c4c97100545f5c31"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.545Z",
            "updatedAt": "2016-08-11T03:43:05.545Z",
            "objectId": "57abf449c4c97100545f5c30"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.536Z",
            "updatedAt": "2016-08-11T03:43:05.536Z",
            "objectId": "57abf449c4c97100545f5c2f"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.526Z",
            "updatedAt": "2016-08-11T03:43:05.526Z",
            "objectId": "57abf449c4c97100545f5c2e"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.515Z",
            "updatedAt": "2016-08-11T03:43:05.515Z",
            "objectId": "57abf449c4c97100545f5c2d"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.502Z",
            "updatedAt": "2016-08-11T03:43:05.502Z",
            "objectId": "57abf449c4c97100545f5c2c"
        },
        {
            "name": "Lightroom 5, Master Adobe Lightroom 5 & Be More Productive",
            "url": "http://www.0daydown.com/08/598214.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.486Z",
            "updatedAt": "2016-08-11T03:43:05.486Z",
            "objectId": "57abf449c4c97100545f5c2b"
        },
        {
            "name": "File Storage Using AWS S3 and Glacier: Developer Deep Dive",
            "url": "http://www.0daydown.com/08/598212.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.472Z",
            "updatedAt": "2016-08-11T03:43:05.472Z",
            "objectId": "57abf449c4c97100545f5c2a"
        },
        {
            "name": "Introduction to Modul8",
            "url": "http://www.0daydown.com/08/598318.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:43:05.454Z",
            "updatedAt": "2016-08-11T03:43:05.454Z",
            "objectId": "57abf449c4c97100545f5c29"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.504Z",
            "updatedAt": "2016-08-11T03:42:40.504Z",
            "objectId": "57abf4307db2a20054035460"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.496Z",
            "updatedAt": "2016-08-11T03:42:40.496Z",
            "objectId": "57abf4307db2a2005403545e"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.488Z",
            "updatedAt": "2016-08-11T03:42:40.488Z",
            "objectId": "57abf4307db2a2005403545d"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.480Z",
            "updatedAt": "2016-08-11T03:42:40.480Z",
            "objectId": "57abf4307db2a2005403545c"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.473Z",
            "updatedAt": "2016-08-11T03:42:40.473Z",
            "objectId": "57abf4307db2a2005403545b"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.456Z",
            "updatedAt": "2016-08-11T03:42:40.456Z",
            "objectId": "57abf4307db2a2005403545a"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.449Z",
            "updatedAt": "2016-08-11T03:42:40.449Z",
            "objectId": "57abf4307db2a20054035459"
        },
        {
            "name": "Lightroom 5, Master Adobe Lightroom 5 & Be More Productive",
            "url": "http://www.0daydown.com/08/598214.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.443Z",
            "updatedAt": "2016-08-11T03:42:40.443Z",
            "objectId": "57abf4307db2a20054035458"
        },
        {
            "name": "File Storage Using AWS S3 and Glacier: Developer Deep Dive",
            "url": "http://www.0daydown.com/08/598212.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.436Z",
            "updatedAt": "2016-08-11T03:42:40.436Z",
            "objectId": "57abf4307db2a20054035457"
        },
        {
            "name": "Introduction to Modul8",
            "url": "http://www.0daydown.com/08/598318.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:40.428Z",
            "updatedAt": "2016-08-11T03:42:40.428Z",
            "objectId": "57abf4307db2a20054035456"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:13.159Z",
            "updatedAt": "2016-08-11T03:42:13.159Z",
            "objectId": "57abf41579bc440058bc1d5a"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:13.142Z",
            "updatedAt": "2016-08-11T03:42:13.142Z",
            "objectId": "57abf41579bc440058bc1d59"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:13.130Z",
            "updatedAt": "2016-08-11T03:42:13.130Z",
            "objectId": "57abf41579bc440058bc1d58"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:13.119Z",
            "updatedAt": "2016-08-11T03:42:13.119Z",
            "objectId": "57abf41579bc440058bc1d57"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:13.088Z",
            "updatedAt": "2016-08-11T03:42:13.088Z",
            "objectId": "57abf41579bc440058bc1d56"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:13.043Z",
            "updatedAt": "2016-08-11T03:42:13.043Z",
            "objectId": "57abf41579bc440058bc1d54"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:13.027Z",
            "updatedAt": "2016-08-11T03:42:13.027Z",
            "objectId": "57abf41579bc440058bc1d53"
        },
        {
            "name": "Lightroom 5, Master Adobe Lightroom 5 & Be More Productive",
            "url": "http://www.0daydown.com/08/598214.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:13.002Z",
            "updatedAt": "2016-08-11T03:42:13.002Z",
            "objectId": "57abf41579bc440058bc1d52"
        },
        {
            "name": "File Storage Using AWS S3 and Glacier: Developer Deep Dive",
            "url": "http://www.0daydown.com/08/598212.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:12.991Z",
            "updatedAt": "2016-08-11T03:42:12.991Z",
            "objectId": "57abf41479bc440058bc1d51"
        },
        {
            "name": "Introduction to Modul8",
            "url": "http://www.0daydown.com/08/598318.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:42:12.967Z",
            "updatedAt": "2016-08-11T03:42:12.967Z",
            "objectId": "57abf41479bc440058bc1d50"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.275Z",
            "updatedAt": "2016-08-11T03:36:47.275Z",
            "objectId": "57abf2cfa341310060dc208f"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.255Z",
            "updatedAt": "2016-08-11T03:36:47.255Z",
            "objectId": "57abf2cfa341310060dc208e"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.240Z",
            "updatedAt": "2016-08-11T03:36:47.240Z",
            "objectId": "57abf2cfa341310060dc208d"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.217Z",
            "updatedAt": "2016-08-11T03:36:47.217Z",
            "objectId": "57abf2cfa341310060dc208c"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.186Z",
            "updatedAt": "2016-08-11T03:36:47.186Z",
            "objectId": "57abf2cfa341310060dc208b"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.158Z",
            "updatedAt": "2016-08-11T03:36:47.158Z",
            "objectId": "57abf2cfa341310060dc208a"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.122Z",
            "updatedAt": "2016-08-11T03:36:47.122Z",
            "objectId": "57abf2cfa341310060dc2089"
        },
        {
            "name": "Lightroom 5, Master Adobe Lightroom 5 & Be More Productive",
            "url": "http://www.0daydown.com/08/598214.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.087Z",
            "updatedAt": "2016-08-11T03:36:47.087Z",
            "objectId": "57abf2cfa341310060dc2088"
        },
        {
            "name": "File Storage Using AWS S3 and Glacier: Developer Deep Dive",
            "url": "http://www.0daydown.com/08/598212.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.057Z",
            "updatedAt": "2016-08-11T03:36:47.057Z",
            "objectId": "57abf2cfa341310060dc2087"
        },
        {
            "name": "Introduction to Modul8",
            "url": "http://www.0daydown.com/08/598318.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-11T03:36:47.012Z",
            "updatedAt": "2016-08-11T03:36:47.012Z",
            "objectId": "57abf2cfa341310060dc2086"
        },
        {
            "name": "ABRSM Music Theory Grade 4",
            "url": "http://www.0daydown.com/08/597546.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.448Z",
            "updatedAt": "2016-08-10T10:29:29.448Z",
            "objectId": "57ab0209a633bd00606db818"
        },
        {
            "name": "Creating Custom Controls in iOS",
            "url": "http://www.0daydown.com/08/597538.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.438Z",
            "updatedAt": "2016-08-10T10:29:29.438Z",
            "objectId": "57ab0209a633bd00606db817"
        },
        {
            "name": "UWP Audio Fundamentals (2016)",
            "url": "http://www.0daydown.com/08/597941.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.425Z",
            "updatedAt": "2016-08-10T10:29:29.425Z",
            "objectId": "57ab0209a633bd00606db816"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.413Z",
            "updatedAt": "2016-08-10T10:29:29.413Z",
            "objectId": "57ab0209a633bd00606db815"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.403Z",
            "updatedAt": "2016-08-10T10:29:29.403Z",
            "objectId": "57ab0209a633bd00606db814"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.393Z",
            "updatedAt": "2016-08-10T10:29:29.393Z",
            "objectId": "57ab0209a633bd00606db813"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.369Z",
            "updatedAt": "2016-08-10T10:29:29.369Z",
            "objectId": "57ab0209a633bd00606db812"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.361Z",
            "updatedAt": "2016-08-10T10:29:29.361Z",
            "objectId": "57ab0209a633bd00606db811"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.351Z",
            "updatedAt": "2016-08-10T10:29:29.351Z",
            "objectId": "57ab0209a633bd00606db810"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:29:29.343Z",
            "updatedAt": "2016-08-10T10:29:29.343Z",
            "objectId": "57ab0209a633bd00606db80f"
        },
        {
            "name": "ABRSM Music Theory Grade 4",
            "url": "http://www.0daydown.com/08/597546.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.847Z",
            "updatedAt": "2016-08-10T10:27:46.847Z",
            "objectId": "57ab01a20a2b58005875a3b7"
        },
        {
            "name": "Creating Custom Controls in iOS",
            "url": "http://www.0daydown.com/08/597538.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.836Z",
            "updatedAt": "2016-08-10T10:27:46.836Z",
            "objectId": "57ab01a20a2b58005875a3b6"
        },
        {
            "name": "UWP Audio Fundamentals (2016)",
            "url": "http://www.0daydown.com/08/597941.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.818Z",
            "updatedAt": "2016-08-10T10:27:46.818Z",
            "objectId": "57ab01a20a2b58005875a3b3"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.808Z",
            "updatedAt": "2016-08-10T10:27:46.808Z",
            "objectId": "57ab01a20a2b58005875a3b2"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.799Z",
            "updatedAt": "2016-08-10T10:27:46.799Z",
            "objectId": "57ab01a20a2b58005875a3b1"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.790Z",
            "updatedAt": "2016-08-10T10:27:46.790Z",
            "objectId": "57ab01a20a2b58005875a3b0"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.759Z",
            "updatedAt": "2016-08-10T10:27:46.759Z",
            "objectId": "57ab01a20a2b58005875a3af"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.750Z",
            "updatedAt": "2016-08-10T10:27:46.750Z",
            "objectId": "57ab01a20a2b58005875a3ae"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.738Z",
            "updatedAt": "2016-08-10T10:27:46.738Z",
            "objectId": "57ab01a20a2b58005875a3ac"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:46.726Z",
            "updatedAt": "2016-08-10T10:27:46.726Z",
            "objectId": "57ab01a20a2b58005875a3ab"
        },
        {
            "name": "ABRSM Music Theory Grade 4",
            "url": "http://www.0daydown.com/08/597546.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.778Z",
            "updatedAt": "2016-08-10T10:27:23.778Z",
            "objectId": "57ab018b128fe10054a5c414"
        },
        {
            "name": "Creating Custom Controls in iOS",
            "url": "http://www.0daydown.com/08/597538.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.766Z",
            "updatedAt": "2016-08-10T10:27:23.766Z",
            "objectId": "57ab018b128fe10054a5c413"
        },
        {
            "name": "UWP Audio Fundamentals (2016)",
            "url": "http://www.0daydown.com/08/597941.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.756Z",
            "updatedAt": "2016-08-10T10:27:23.756Z",
            "objectId": "57ab018b128fe10054a5c412"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.748Z",
            "updatedAt": "2016-08-10T10:27:23.748Z",
            "objectId": "57ab018b128fe10054a5c411"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.738Z",
            "updatedAt": "2016-08-10T10:27:23.738Z",
            "objectId": "57ab018b128fe10054a5c410"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.729Z",
            "updatedAt": "2016-08-10T10:27:23.729Z",
            "objectId": "57ab018b128fe10054a5c40f"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.720Z",
            "updatedAt": "2016-08-10T10:27:23.720Z",
            "objectId": "57ab018b128fe10054a5c40e"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.711Z",
            "updatedAt": "2016-08-10T10:27:23.711Z",
            "objectId": "57ab018b128fe10054a5c40c"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.698Z",
            "updatedAt": "2016-08-10T10:27:23.698Z",
            "objectId": "57ab018b128fe10054a5c40b"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:23.679Z",
            "updatedAt": "2016-08-10T10:27:23.679Z",
            "objectId": "57ab018b128fe10054a5c40a"
        },
        {
            "name": "ABRSM Music Theory Grade 4",
            "url": "http://www.0daydown.com/08/597546.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.688Z",
            "updatedAt": "2016-08-10T10:27:11.688Z",
            "objectId": "57ab017fc4c971005a449152"
        },
        {
            "name": "Creating Custom Controls in iOS",
            "url": "http://www.0daydown.com/08/597538.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.675Z",
            "updatedAt": "2016-08-10T10:27:11.675Z",
            "objectId": "57ab017fc4c971005a449151"
        },
        {
            "name": "UWP Audio Fundamentals (2016)",
            "url": "http://www.0daydown.com/08/597941.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.643Z",
            "updatedAt": "2016-08-10T10:27:11.643Z",
            "objectId": "57ab017fc4c971005a449150"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.623Z",
            "updatedAt": "2016-08-10T10:27:11.623Z",
            "objectId": "57ab017fc4c971005a44914f"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.602Z",
            "updatedAt": "2016-08-10T10:27:11.602Z",
            "objectId": "57ab017fc4c971005a44914e"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.588Z",
            "updatedAt": "2016-08-10T10:27:11.588Z",
            "objectId": "57ab017fc4c971005a44914d"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.573Z",
            "updatedAt": "2016-08-10T10:27:11.573Z",
            "objectId": "57ab017fc4c971005a44914c"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.547Z",
            "updatedAt": "2016-08-10T10:27:11.547Z",
            "objectId": "57ab017fc4c971005a44914b"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.529Z",
            "updatedAt": "2016-08-10T10:27:11.529Z",
            "objectId": "57ab017fc4c971005a44914a"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:11.503Z",
            "updatedAt": "2016-08-10T10:27:11.503Z",
            "objectId": "57ab017fc4c971005a449148"
        },
        {
            "name": "ABRSM Music Theory Grade 4",
            "url": "http://www.0daydown.com/08/597546.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.511Z",
            "updatedAt": "2016-08-10T10:27:09.511Z",
            "objectId": "57ab017d128fe10054a5c387"
        },
        {
            "name": "Creating Custom Controls in iOS",
            "url": "http://www.0daydown.com/08/597538.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.502Z",
            "updatedAt": "2016-08-10T10:27:09.502Z",
            "objectId": "57ab017d128fe10054a5c386"
        },
        {
            "name": "UWP Audio Fundamentals (2016)",
            "url": "http://www.0daydown.com/08/597941.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.457Z",
            "updatedAt": "2016-08-10T10:27:09.457Z",
            "objectId": "57ab017d128fe10054a5c385"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.448Z",
            "updatedAt": "2016-08-10T10:27:09.448Z",
            "objectId": "57ab017d128fe10054a5c384"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.438Z",
            "updatedAt": "2016-08-10T10:27:09.438Z",
            "objectId": "57ab017d128fe10054a5c383"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.427Z",
            "updatedAt": "2016-08-10T10:27:09.427Z",
            "objectId": "57ab017d128fe10054a5c382"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.419Z",
            "updatedAt": "2016-08-10T10:27:09.419Z",
            "objectId": "57ab017d128fe10054a5c381"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.411Z",
            "updatedAt": "2016-08-10T10:27:09.411Z",
            "objectId": "57ab017d128fe10054a5c380"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.402Z",
            "updatedAt": "2016-08-10T10:27:09.402Z",
            "objectId": "57ab017d128fe10054a5c37f"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:27:09.391Z",
            "updatedAt": "2016-08-10T10:27:09.391Z",
            "objectId": "57ab017d128fe10054a5c37d"
        },
        {
            "name": "ABRSM Music Theory Grade 4",
            "url": "http://www.0daydown.com/08/597546.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.667Z",
            "updatedAt": "2016-08-10T10:26:16.667Z",
            "objectId": "57ab01488ac247005f4eea60"
        },
        {
            "name": "Creating Custom Controls in iOS",
            "url": "http://www.0daydown.com/08/597538.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.619Z",
            "updatedAt": "2016-08-10T10:26:16.619Z",
            "objectId": "57ab01488ac247005f4eea5f"
        },
        {
            "name": "UWP Audio Fundamentals (2016)",
            "url": "http://www.0daydown.com/08/597941.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.524Z",
            "updatedAt": "2016-08-10T10:26:16.524Z",
            "objectId": "57ab01488ac247005f4eea5d"
        },
        {
            "name": "DIY simple smart home system (2016)",
            "url": "http://www.0daydown.com/08/597933.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.478Z",
            "updatedAt": "2016-08-10T10:26:16.478Z",
            "objectId": "57ab01488ac247005f4eea5c"
        },
        {
            "name": "Creating Automotive Materials in Unreal Engine 4",
            "url": "http://www.0daydown.com/08/598081.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.440Z",
            "updatedAt": "2016-08-10T10:26:16.440Z",
            "objectId": "57ab01488ac247005f4eea5b"
        },
        {
            "name": "Displacement vs Parallax Mapping in UE4",
            "url": "http://www.0daydown.com/08/598082.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.418Z",
            "updatedAt": "2016-08-10T10:26:16.418Z",
            "objectId": "57ab01488ac247005f4eea5a"
        },
        {
            "name": "Lynda – 5 Ways to Control Your Time",
            "url": "http://www.0daydown.com/08/598065.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.366Z",
            "updatedAt": "2016-08-10T10:26:16.366Z",
            "objectId": "57ab01488ac247005f4eea59"
        },
        {
            "name": "Lynda – Efficient Time Management",
            "url": "http://www.0daydown.com/08/598061.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.351Z",
            "updatedAt": "2016-08-10T10:26:16.351Z",
            "objectId": "57ab01488ac247005f4eea58"
        },
        {
            "name": "Lynda – Reactive Programming in iOS with RxSwift",
            "url": "http://www.0daydown.com/08/598057.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.304Z",
            "updatedAt": "2016-08-10T10:26:16.304Z",
            "objectId": "57ab01488ac247005f4eea57"
        },
        {
            "name": "Lynda – Managing Actual Values in Microsoft Project",
            "url": "http://www.0daydown.com/08/598051.html",
            "ACL": {
                "*": {
                    "write": false,
                    "read": true
                }
            },
            "createdAt": "2016-08-10T10:26:16.278Z",
            "updatedAt": "2016-08-10T10:26:16.278Z",
            "objectId": "57ab01488ac247005f4eea56"
        }
    ];
    var Queue = {};
    DATA.forEach(function(v,i){
        console.log(i,v)
    })
    // console.log("data : ", DATA);

}


deduplicate();