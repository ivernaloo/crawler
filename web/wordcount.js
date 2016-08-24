/**
 * Created by xiaomi on 2016/8/24.
 */

exports.count = function (sentence){
    console.log("word count");
    var index = {}, // 字典
        words = sentence
            .replace(/[.,?!;()"'-], " "/)
            .replace(/\s+/g, " ")
            .toLowerCase()
            .split(" ");

    words.forEach(function(word){
        if (!(index.hasOwnProperty(word))){
            index[word] = 0;
        }
        index[word]++;
    });
   return index;
};
