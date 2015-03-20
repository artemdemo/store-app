/*global storeApp, _, $, Backbone*/

(function(app){

    var HomePage = Backbone.View.extend({
        el: app.viewsFactory.mainContainer,
        render: function () {
            var self = this;
            var template = _.template( $('#tpl-home').html() );
            self.$el.html( template() );

            if ( ! app.menuFactory.menuCollection ) {
                app.menuFactory.menuCollection = new app.menuFactory.Menu();
                app.menuFactory.menuCollection.fetch({
                    success: function(menuObj) {}
                });
            }
        }
    });
    
    app.viewsFactory.HomePage = new HomePage();
    
    app.router.on('route:home', function(){
        app.viewsFactory.HomePage.render();
    });

})(storeApp);