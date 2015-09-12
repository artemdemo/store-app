define(
    [
        'backbone',
        '../models/item'
    ],
    function(Backbone, Item){

        return (function(){

            var collection = Backbone.Collection.extend({
                model: Item
            });

            return (function () {
                var cartItems;

                return (function(){
                    cartItems = cartItems || new collection;
                    return cartItems;
                })();
            })()

        })()

    });