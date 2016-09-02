/**
 * Created by xiaomi on 2016/8/24.
 */
var fs = require('fs');

exports.count = function (sentence) {
    return exports.transformRankArray(
        exports.dict(sentence)
    )
};


exports.dict = function (sentence, dict) {
    var rank = [],
        index = dict || {}, // 字典
        BLACKLIST = [
            "a", "to", "for", "and", "in", "with", "the", "on", "ine", "cc",
            "of", "an", "by", "your", "how", "of", "learn", "training", "development",
            "course", "from", "complete", "fundamentals", "beginner", "beginners", "using", "updated"
        ],
        words = sentence
            .replace(/[\s+\W]/g, " ")
            .toLowerCase()
            .split(" ");

    words.forEach(function (word) {

        // 只要名词，去掉数字
        if (!isNaN(parseFloat(word) && isFinite(word))) {
            return;
        }

        // 去掉觉副词
        if (BLACKLIST.indexOf(word) > -1) return;
        if (word.length < 3) return;

        if (!(index.hasOwnProperty(word))) {
            index[word] = 0;
        }
        if (word.length > 0) {
            index[word]++;
        }
    });

    return index;
};

exports.transformRankArray = function(object){
    var rank = [];
    Object.keys(object).forEach(function (v, i) {
        rank.push({"name": v, "num": object[v]})
    });

    rank.sort(byProperty("num"));

    return rank;
}
var byProperty = function (prop) {
    return function (a, b) {
        return b[prop] - a[prop];
    };
};