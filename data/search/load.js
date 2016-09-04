var elasticclunr = require('elasticlunr');
var data = require('../leancloud');

var index = elasticclunr(function () {
    this.addField('title');
    this.addField('url');
    this.setRef('id');
});

data.getAllData(function(list){
    console.log("加载完所有数据");
    list.forEach(function(v,i){
        index.addDoc({
            "id" : v.objectId,
            "title" : v.name,
            "url" : v.url
        })
    })

})

