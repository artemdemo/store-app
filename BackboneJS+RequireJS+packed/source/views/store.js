define([
    'backbone',
    'underscore',
    '../common',
    'text!../../templates/store.html',
    '../views/shelf',
    '../views/cart',
    '../collections/menu',
    '../collections/items'
], function(Backbone, _, common, storeTemplate, shelfView, cartView, menuCollection, itemsCollection){

    var view = Backbone.View.extend({
        el: common.mainContainer,
        render: function () {
            var self = this;
            var template = _.template( storeTemplate );
            self.$el.html( template() );

            shelfView.currentCategory = menuCollection.models[0];
            itemsCollection.set( shelfView.currentCategory.get('items') );
            shelfView.render();

            cartView.render();
        }
    });

    return (function(){
        var store;

        return (function(){
            store = store || new view;
            return store;
        })();
    })();

});