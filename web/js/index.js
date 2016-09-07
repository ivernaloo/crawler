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

function loadList(pageNumber, type, cal){
    var url = "",
        callback;
    if ( type ) {
        url = "/list/";
        callback = function(data){
            cal(data);
        }
    } else {
        url = "/page/";
        callback = function(data){
            $(".list-group").append($(data));
        }
    }
    $.get(
            url + pageNumber,
            function(data){
                if (data.length > 0){
                    callback(data)
                } else {
                    alert("到底了")
                }

            }
        )
}

// register the grid component
Vue.component('list-container', {
    template: '#list-template',
    replace: true,
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data: function () {
        // var sortOrders = {};
        // this.columns.forEach(function (key) {
        //     sortOrders[key] = 1
        // });
        // return {
        //     sortKey: '',
        //     sortOrders: sortOrders
        // }
    },
    methods: {
        // sortBy: function (key) {
        //     this.sortKey = key
        //     this.sortOrders[key] = this.sortOrders[key] * -1
        // }
    }
})

// bootstrap the demo
var demo = new Vue({
    el: '#app',
    beforeCompile : function(){
        var self = this;
        loadList(0, "json", function(data){
            self.lists = data;
        });

    },
    data: {
        searchQuery: '',
        lists: []
    },
    methods : {
        search: function(){
            console.log(this.searchQuery);
            return false;
        }
    }

});
