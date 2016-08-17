var DATA = require("./sample").RAWDATA;
function deduplicate(){
    var Queue = {};
    var LIST_ID = [];
    var REQUEST = [];

    console.log("right");
    DATA.forEach(function(v,i){
        if ( !Queue[v.name] ) {
            Queue[v.name] = 1;
        } else {
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
    console.log("REQUEST : ", REQUEST.length);
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
}