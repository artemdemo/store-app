/*global Backbone, _, $, console*/

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var app = {};

app.User = Backbone.Model.extend({
    urlRoot: './users'
});

app.Users = Backbone.Collection.extend({
    url: 'users.json',
    model: app.User
});



app.UserList = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var template = _.template( $('#user-list-template').html() );
        if ( ! app.usersCollection ) {
            app.usersCollection = new app.Users();
            app.usersCollection.fetch({
                success: function(usersObj) {
                    that.$el.html( template({users: usersObj.models}) );
                }
            });
        } else {
            that.$el.html( template({users: app.usersCollection.models}) );
        }
    }
});

app.EditUser = Backbone.View.extend({
    el: '.page',
    render: function(options) {
        var that = this;
        var template = _.template( $('#user-edit-template').html() );
        if ( options.id ) {
            /*
            // GET request to the server
            var user = new User({id: options.id});
            user.fetch({
                success: function (user) {
                    
                }
            });
            */
            var currentUser = app.usersCollection.get(options.id);
            that.$el.html( template({user: currentUser}) );
        } else {
            that.$el.html( template( {user: null} ) );
        }
    },
    events: {
        'submit .edit-user-form': 'saveUser'
    },
    saveUser: function (ev) {
        ev.preventDefault();
        var userDetails = $(ev.currentTarget).serializeObject();
        /*
        // If you want t send data to the server you need to use following code
        // It also will add new data to users collection
        var user = new User();
        user.save(userDetails, {
            success: function(user) {
                router.navigate('', {trigger: true});
            }
        });
        */
        app.usersCollection.set(userDetails,{remove: false});
        app.router.navigate('', {trigger: true});
    }
});


app.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'new': 'editUser',
        'edit/:id': 'editUser'
    }
});

app.userlist = new app.UserList();
app.editUser = new app.EditUser();

app.router = new app.Router();
app.router.on('route:home', function(){
    app.userlist.render();
});
app.router.on('route:editUser', function(id){
    app.editUser.render({id: id});
});

Backbone.history.start();