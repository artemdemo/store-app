define([
    'backbone',
    'underscore',
    'jquery',
    '../common',
    'text!../../templates/store-cart.html',
    '../collections/cartItems',
    '../factories/storeFactory'
], function(Backbone, _, $, common, cartTemplate, cartItemsCollection, storeFactory){

    var view = Backbone.View.extend({
        render: function () {
            var self = this;
            var template = _.template( cartTemplate );

            self.setElement( $('.cartContainer') );

            self.$el.html( template({
                items: cartItemsCollection.models,
                subtotal: this.getSubTotal(),
                tax: this.getTax(),
                total: this.getTotal(),
                renderPrice: storeFactory.renderPrice
            }) );
        },
        events: {
            'click .cartItemsContainer .remove': 'removeItemFromCart'
        },
        removeItemFromCart: function(ev) {
            var itemId = ev.currentTarget.dataset.itemId;
            var item = cartItemsCollection.get(itemId);
            item.trigger('destroy', item);
            this.render();
        },
        getSubTotal: function() {
            var subtotal = 0;
            _.each(cartItemsCollection.models, function(item){
                subtotal += parseFloat( item.get('price') );
            });
            return subtotal;
        },
        getTax: function() {
            var tax = 0;
            _.each(cartItemsCollection.models, function(item){
                tax += parseFloat( item.get('tax') );
            });
            return tax;
        },
        getTotal: function() {
            return this.getSubTotal() + this.getTax();
        }
    });

    return (function(){
        var cart;

        return (function(){
            cart = cart || new view;
            return cart;
        })();
    })();

});