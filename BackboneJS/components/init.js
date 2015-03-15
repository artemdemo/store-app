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
            return this.homeView;
        },
        store: function() {
            if(!this.storeView) {
                this.storeView = new api.views.store({ 
                    el: api.content
                });
            }
            return this.storeView;
        }
    };
    
    var Router = Backbone.Router.extend({
            routes: {
                "store": "store",
                "": "home"
            },
            store: function() {
                console.log('Store');
                //ViewsFactory.store();
                var view = ViewsFactory.store();
                api.changeContent(view.$el);
                view.render();
            },
            home: function() {
                console.log('Home');
                //ViewsFactory.home();
            }
        });
    api.router = new Router();
    
    Backbone.history.start(); 
 
    return api;
 
})();


$(document).ready(function(){
    storeApp.init();
});
    
