var elasticlunr = require('elasticlunr');
    fs = require('fs'),
    cloud = require('../leancloud');

var data = {};

var index = elasticlunr(function () {
    this.addField('title');
    this.addField('url');
    this.setRef('id');
});

cloud.getAllData(function(list){
    console.log("加载完所有数据");
    list.forEach(function(v,i){
        index.addDoc({
            "id" : v.objectId,
            "title" : v.name,
            "url" : v.url
        });


        data[v.objectId] = {
            "name" : v.name,
            "url" : v.url,
            "createdAt" : v.createdAt,
            "updatedAt" : v.updatedAt,
            "objectId" : v.objectId
        };
    });

    fs.writeFile('./data/search/database.json', JSON.stringify(index), function (err) {
        if (err) throw err;
        console.log('建立完索引');
    });

    fs.writeFile('./data/search/data.json', JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('建立完所有数据');
    });
});


