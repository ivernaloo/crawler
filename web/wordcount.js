/**
 * Created by xiaomi on 2016/8/24.
 */
var fs = require('fs');

exports.count = function (sentence){
    console.log("word count");
    var rank = [],
        index = {}, // 字典
        BLACKLIST = ["a", "to", "for", "and", "in", "with", "the", "on"],
        words = sentence
            .replace(/[.,?!;()"'-]/g, " ")
            .replace(/[\s+\W]/g, " ")
            .toLowerCase()
            .split(" ");

    words.forEach(function(word){

        // 只要名词，去掉数字
        if (!isNaN(parseFloat(word) && isFinite(word))){
            return;
        }

        // 去掉觉副词
        if ( BLACKLIST.indexOf(word) > -1 ) return;

        if (!(index.hasOwnProperty(word))){
            index[word] = 0;
        }
        if (word.length > 0){
            index[word]++;
        }
    });
    
    Object.keys(index).forEach(function(v, i){
        rank.push({ "name" : v, "num" : index[v]})
    });

    rank.sort(byProperty("num"));
   return rank;
};

var byProperty = function(prop) {
    return function(a,b){
        return b[prop] - a[prop] ;
    };
};