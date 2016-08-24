var ITEMS = $(".list-group-item");
var COUNT = 1;

$(window).scroll(function(){

    if  ($(window).scrollTop() == $(document).height() - $(window).height()){
        // run our call for pagination
        console.log("count : ", COUNT);
        loadList(COUNT);
        COUNT++;
    }

});

function loadList(pageNumber){
    $.get(
            "/page/" + pageNumber,
            function(data){
                console.log(" data : ", data.length);
                if (data.length > 0){
                    $(".list-group").append($(data));
                } else {
                    alert("到底了")
                }

            }
        )
}