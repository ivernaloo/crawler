var ITEMS = $(".list-group-item");
var COUNT = 1;



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
    filters: {
        moment: function(date){
            return moment(date).format('YYYY / MM / DD')
        }
    }
});

// bootstrap the demo
var demo = new Vue({
    el: '#app',
    beforeCompile : function(){
        var self = this;
        loadList(0, "json", function(data){
            self.lists = data;
        });

    },
    ready : function(){
        var self = this;
        $(window).scroll(function(){

            if  ($(window).scrollTop() == $(document).height() - $(window).height()){
                // run our call for pagination
                loadList(COUNT, "json", function(data){
                    self.lists = self.lists.concat(data);
                });
                COUNT++;
            }

        });
    },
    data: {
        searchQuery: '',
        lists: []
    },
    methods : {
        search: function(){
            var self = this;
            $.get("search/" + this.searchQuery, function(res){
                self.lists = res;
            });
            return false;
        },
        
        tag : function(e){
            var self = this;
            $.get("search/" + e.target.innerText, function(res){
                self.lists = res;
                self.searchQuery = e.target.innerText;
            });
            return false;
        }
    }
});

Vue.filter('highlight', function(words, query){
    var re = new RegExp(query, "gi");
    return words.replace(re, function($0,$1){
        return '<span class=\'highlight\'>' + $0 + '</span>'
    })
});