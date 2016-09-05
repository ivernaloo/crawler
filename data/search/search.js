var elasticlunr = require('elasticlunr');
var data = require('./database.json');
var source = require('./data.json');
var index = elasticlunr.Index.load(data)

function search(item) {
    return index.search(item, {
                fields: {
                    title: {boost: 2, bool: "AND"}
                }
            })
            .map(function(item){
                return source[item.ref];
            })
}

exports.search = search; // 外部的不能使用

