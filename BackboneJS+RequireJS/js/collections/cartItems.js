define(
    [
        'backbone',
        '../models/item'
    ],
    function(Backbone, Item){

        return (function(){

            var cartItems;

            function createInstance() {
                var Collection = Backbone.Collection.extend({
                    model: Item
                });
                return new Collection;
            }

            return (function () {
                if (!cartItems) {
                    cartItems = createInstance();
                }
                return cartItems;
            })()

        })()

    });