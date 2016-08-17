var ITEMS = $(".list-group-item");
var COUNT = 1
console.log(" Number : ", ITEMS.length);
$(window).scroll(function(){
    console.clear();
    console.log("SrollTop",$(window).scrollTop())
    console.log("document height",$(window).height())
    console.log("window height",$(window).scrollTop())
    if  ($(window).scrollTop() == $(document).height() - $(window).height()){
        // run our call for pagination
        console.log("count : ", COUNT);
        COUNT++;
    }

});