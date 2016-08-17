var ITEMS = $(".list-group-item");
var COUNT = 1;

$(window).scroll(function(){

    if  ($(window).scrollTop() == $(document).height() - $(window).height()){
        // run our call for pagination
        console.log("count : ", COUNT);
        COUNT++;
    }

});