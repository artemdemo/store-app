define(
    [
        'backbone',
        'underscore',
        'jquery',
        '../common',
        'text!../../templates/store-shelf.html',
        '../collections/menu',
        '../collections/items',
        '../collections/cartItems',
        '../views/cart',
        '../factories/storeFactory'
    ],
    function(Backbone, _, $, common, shelfTemplate, menuCollection, itemsCollection, cartItemCollections, cartView, storeFactory){

        var view = Backbone.View.extend({
            currentCategory: null,
            render: function () {
                var self = this;
                var template = _.template( shelfTemplate );

                self.setElement( $('.shelfContainer') );

                self.$el.html( template({
                    categories: menuCollection.models,
                    currentCategoryID: self.currentCategory.get('id'),
                    currentCategoryItems: itemsCollection.models,
                    renderPrice: storeFactory.renderPrice
                }) );
            },
            events: {
                'click .categoriesContainer .item': 'openCategory',
                'click .itemsContainer .item': 'addItemToCart'
            },
            openCategory: function(ev) {
                var catId = ev.currentTarget.dataset.categoryId;
                this.currentCategory = menuCollection.get(catId);
                itemsCollection.set( this.currentCategory.get('items') );
                this.render();
            },
            addItemToCart: function(ev) {
                var itemId = ev.currentTarget.dataset.itemId;
                var item = itemsCollection.get(itemId).toJSON();

                // I need to change ID, otherwise I can't add two identical items
                item.id = (new Date()).getTime();
                item.menuId = itemId;
                cartItemCollections.add(item);
                cartView.render();
            }
        });

        return (function(){
            var shelf;

            return (function(){
                shelf = shelf || new view;
                return shelf;
            })();
        })();

    });