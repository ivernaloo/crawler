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

// register the grid component
Vue.component('demo-grid', {
    template: '#list-template',
    replace: true,
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data: function () {
        var sortOrders = {}
        this.columns.forEach(function (key) {
            sortOrders[key] = 1
        })
        return {
            sortKey: '',
            sortOrders: sortOrders
        }
    },
    methods: {
        sortBy: function (key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        }
    }
})

// bootstrap the demo
var demo = new Vue({
    el: '#demo',
    data: {
        searchQuery: '',
        gridColumns: ['name', 'power'],
        gridData: [
            { name: 'Chuck Norris', power: Infinity },
            { name: 'Bruce Lee', power: 9000 },
            { name: 'Jackie Chan', power: 7000 },
            { name: 'Jet Li', power: 8000 }
        ]
    }
})
