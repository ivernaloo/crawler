var elasticlunr = require('elasticlunr');
var data = require('./database.json');

index = elasticlunr.Index.load(data)

exports.search = index.search; // 外部的不能使用

