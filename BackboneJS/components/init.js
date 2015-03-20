/*global $, Backbone, document, console*/

var storeApp = {
    viewsFactory: {
        mainContainer: '#mainContainer'
    },
    menuFactory: {},
};

storeApp.menuFactory.Category = Backbone.Model.extend({
    urlRoot: './categories'
});

storeApp.menuFactory.Menu = Backbone.Collection.extend({
    url: '../menu.json',
    model: storeApp.menuFactory.Category
});


storeApp.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'store': 'store'
    }
});
storeApp.router = new storeApp.Router();



$(document).ready(function(){
    Backbone.history.start();
});
