/*global Backbone, _, $, console*/

var Users = Backbone.Collection.extend({
    url: 'users.json'
});

var UserList = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var users = new Users();
        users.fetch({
            success: function(usersObj) {
                var template = _.template( $('#user-list-template').html() );
                that.$el.html( template({users: usersObj.models}) );
            }
        });
        
    }
});
var userlist = new UserList();

var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    }
});

var router = new Router();
router.on('route:home', function(){
    userlist.render();
});

Backbone.history.start();