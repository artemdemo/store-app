define(
    [
        'backbone',
        './views/home',
        './views/store'
    ],
    function( Backbone, HomeView, StoreView ){

    return Backbone.Router.extend({
        routes: {
            '': 'home',
            'store': 'store'
        },

        home: function() {
            HomeView.render();
        },

        store: function() {
            StoreView.render();
        }
    });

});