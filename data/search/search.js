var elasticlunr = require('elasticlunr');
var data = require('./database.json');

index = elasticlunr.Index.load(data)

function search(item){
    return index.search(item)
}
exports.search = search; // 外部的不能使用

