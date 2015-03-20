/*global storeApp, _, $, Backbone*/

(function(app){

    // Main object of cart page definition
    var StorePage = Backbone.View.extend({
        el: app.viewsFactory.mainContainer,
        currency: '$',
        render: function () {
            var self = this;
            var template = _.template( $('#tpl-store').html() );
            self.$el.html( template() );
            
            afterStorePageRender();
        },
        renderPrice: function(price) {
            return app.viewsFactory.storePage.currency + price.toFixed(2);
        }
    });
    
    app.viewsFactory.storePage = new StorePage();
    
    var Item = Backbone.Model.extend();
    var Items = Backbone.Collection.extend({
        model: Item
    });
    var CartItems = Backbone.Collection.extend({
        model: Item
    });
    
    // Main object of shelf view definition
    var ShelfView = Backbone.View.extend({
        el: '.shelfContainer',
        currentCategory: null,
        currentItems: new Items(),
        render: function () {
            var self = this;
            var template = _.template( $('#tpl-store-shelf').html() );
            self.$el.html( template({
                categories: app.menuFactory.menuCollection.models,
                currentCategoryID: self.currentCategory.get('id'),
                currentCategoryItems: self.currentItems.models,
                renderPrice: app.viewsFactory.storePage.renderPrice
            }) );
        },
        events: {
            'click .categoriesContainer .item': 'openCategory',
            'click .itemsContainer .item': 'addItemToCart'
        },
        openCategory: function(ev) {
            var catId = ev.currentTarget.dataset.categoryId;
            this.currentCategory = app.menuFactory.menuCollection.get(catId);
            this.currentItems.set( this.currentCategory.get('items') );
            this.render();
        },
        addItemToCart: function(ev) {
            var itemId = ev.currentTarget.dataset.itemId;
            var item = this.currentItems.get(itemId).toJSON();
            // I need to change ID, otherise I can't add two identical items
            item.id = (new Date()).getTime();
            item.menuId = itemId;
            app.viewsFactory.cartView.items.add(item);
            app.viewsFactory.cartView.render();
        }
    });
    
    // Main object of cart view definition
    var CartView = Backbone.View.extend({
        el: '.cartContainer',
        items: new CartItems(),
        render: function () {
            var self = this;
            var template = _.template( $('#tpl-store-cart').html() );
            self.$el.html( template({
                items: this.items.models,
                subtotal: this.getSubTotal(),
                tax: this.getTax(),
                total: this.getTotal(),
                renderPrice: app.viewsFactory.storePage.renderPrice
            }) );
        },
        events: {
            'click .cartItemsContainer .remove': 'removeItemFromCart'
        },
        removeItemFromCart: function(ev) {
            var itemId = ev.currentTarget.dataset.itemId;
            var item = this.items.get(itemId);
            item.trigger('destroy', item);
            this.render();
        },
        getSubTotal: function() {
            var subtotal = 0;
            _.each(this.items.models, function(item){
                subtotal += parseFloat( item.get('price') );
            });
            return subtotal;
        },
        getTax: function() {
            var tax = 0;
            _.each(this.items.models, function(item){
                tax += parseFloat( item.get('tax') );
            });
            return tax;
        },
        getTotal: function() {
            return this.getSubTotal() + this.getTax();
        }
    });
    
    // Function that will be fired after store page is ready
    var afterStorePageRender = function() {
        // Initializing shelf view
        app.viewsFactory.shelfView = new ShelfView();
        app.viewsFactory.shelfView.currentCategory = app.menuFactory.menuCollection.models[0];
        app.viewsFactory.shelfView.currentItems.set( app.viewsFactory.shelfView.currentCategory.get('items') );
        app.viewsFactory.shelfView.render();
        // Initializing cart view
        app.viewsFactory.cartView = new CartView();
        app.viewsFactory.cartView.render();
    };
    
    
    app.router.on('route:store', function(){
        app.viewsFactory.storePage.render();
    });

})(storeApp);