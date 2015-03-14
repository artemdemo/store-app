/*global $, Backbone, document*/

// Good tutorial: http://code.tutsplus.com/tutorials/single-page-todo-application-with-backbonejs--cms-21417

var storeApp = (function() {
 
    var api = {
            views: {},
            models: {},
            collections: {},
            content: null,
            router: null,
            todos: null,
            init: function() {
                this.content = $("#mainContainer");
                ViewsFactory.home();
                return this;
            },
            changeContent: function(el) {
                this.content.empty().append(el);
                return this;
            }
        };
    var ViewsFactory = {
        home: function() {
            if(!this.homeView) {
                this.homeView = new api.views.home({ 
                    el: api.content
                });
            }
            return this.menuView;
        }
    };
    var Router = Backbone.Router.extend({});
    api.router = new Router();
 
    return api;
 
})();


$(document).ready(function(){
    storeApp.init();
});
    
