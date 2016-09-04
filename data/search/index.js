var elasticclunr = require('elasticlunr');
var data = require('../leancloud');

var index = elasticclunr(function () {
    this.addField('name');
    this.addField('url')
    this.setRef('objectId');
    this.saveDocument(false);
});

data.getAllData(function(list){
    console.log("加载完所有数据");
    list.forEach(function(v,i){
        index.addDoc({
            "objectId" : v.objectId,
            "name" : v.name,
            "url" : v.url
        })
    })
})

console.log(index.search("photoshop"));