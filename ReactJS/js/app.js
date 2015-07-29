/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */
(function(){"use strict";function t(){}function i(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(r,o){var e,i,t,s,n=this.getListenersAsObject(r);for(t in n)if(n.hasOwnProperty(t))for(i=n[t].length;i--;)e=n[t][i],e.once===!0&&this.removeListener(r,e.listener),s=e.listener.apply(this,o||[]),s===this._getOnceReturnValue()&&this.removeListener(r,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);
/*global React, document*/
var Home = React.createClass({displayName: "Home",
  openStore: function() {
    React.unmountComponentAtNode( document.getElementById('mainContainer') );
    StoreService.init();
  },
  render: function() {
    return (
      React.createElement("div", {className: "home-page"}, 
        React.createElement("div", {className: "container"}, 
            React.createElement("h1", null, "Start shopping now"), 
            React.createElement("button", {onClick: this.openStore, className: "button"}, "Enter Store")
        )
    )
    );
  }
});

React
  .render(
    React.createElement(Home, null),
    document.getElementById('mainContainer')
  );

var MenuService = (function() {

    var MenuService = {};

    /* constants */
    var menuUrl = '../menu.json';

    /**
     * Main menu object
     *
     * @type {Array}
     */
    var Menu = [];

    /**
     * Current category object.
     * By default will be first one.
     *
     * @type {Object}
     */
    var currentCategory = {};

    /**
     * Get menu from the server
     *
     * @function loadMenu
     * @return {Promise}
     */
    MenuService.loadMenu = function() {
        var deferred = new $.Deferred();

        $.get(menuUrl, function(data) {
            Menu = data;
            currentCategory = data[0];
            deferred.resolve( data );
        });

        return deferred.promise();
    };

    /**
     * Get menu object
     *
     * @function getMenu
     * @return {Array}
     */
    MenuService.getMenu = function() { return Menu; };

    /**
     * Set category to current
     *
     * @function setCurrentCategory
     */
    MenuService.setCurrentCategory = function(newCategory) { currentCategory = newCategory; };

    /**
     * Get current category
     *
     * @function getCurrentCategory
     * @return {Object}
     */
    MenuService.getCurrentCategory = function() { return currentCategory; };

    return MenuService;

})();

var StoreService = (function() {

    var StoreService = {};

    var currency = '$';

    StoreService.menu = [];
    StoreService.currentCategory = {};

    /**
     * Initialization
     *
     * @function init
     */
    StoreService.init = function() {
        $.when( MenuService.loadMenu() )
            .then(function(data){
                StoreService.menu = data;
                StoreService.currentCategory = data[0];
                React
                    .render(
                    React.createElement(StoreContainer, null),
                    document.getElementById('mainContainer')
                );
            });
    };

    /**
     * Set category
     *
     * @function changeCategory
     */
    StoreService.changeCategory = function(newCategory) {
        MenuService.setCurrentCategory( newCategory );
    };

    StoreService.renderPrice = function( price ) {
        return currency + price.toFixed(2);
    };

    return StoreService;

})();
/*global React, $, document, console, EventEmitter*/

// tutorial: https://www.codementor.io/reactjs/tutorial/react-js-flux-architecture-tutorial

/**
 * Initializing new emitter
 */
function Job(){
    EventEmitter.call(this);
}
Job.prototype = new EventEmitter();
var emitter = new Job();


var StoreContainer = React.createClass({displayName: "StoreContainer",
  render: function() {
    return (
        React.createElement("div", {className: "store-page"}, 
            React.createElement("div", {className: "container clearRow"}, 
                React.createElement(Shelf, null), 
                React.createElement(Cart, null)
            )
        )
    );
  }
});



var Shelf = React.createClass({displayName: "Shelf",
    getInitialState: function() {
        return {
            items: StoreService.currentCategory.items
        };
    },

    renderCategoryItems: function() {
        return $.map( StoreService.menu, function(cat, i) {
            var id = String(cat.id) + i;
            return React.createElement(SingleCategory, {key: id, cat: cat});
        });
    },

    renderProducts: function() {
        return $.map( this.state.items, function(product, i) {
            var id = String(product.id) + i;
            return React.createElement(SingleProduct, {key: id, product: product});
        });
    },

    componentWillMount: function() {
        emitter.on('change-category', function(newCat) {
            this.setState({ items: newCat.items });
        }.bind(this));
    },

    render: function() {
        return (
            React.createElement("div", {className: "shelfContainer"}, 
                React.createElement("div", {className: "categoriesContainer"}, 
                    React.createElement("ul", {className: "list clearRow"}, 
                        this.renderCategoryItems()
                    )
                ), 
                React.createElement("div", {className: "itemsContainer"}, 
                    React.createElement("ul", {className: "list"}, 
                        this.renderProducts()
                    )
                )
            )
        );
    }
});

var SingleCategory = React.createClass({displayName: "SingleCategory",
    getInitialState: function() {
        var active = false;
        if ( this.props.cat.id == StoreService.currentCategory.id ) active = true;
        return {
            active: active
        };
    },
    toggle: function() {
        StoreService.changeCategory(this.props.cat);
        emitter.emit('change-category', this.props.cat);
        this.setState({
            active: !this.state.active
        });
    },
    componentWillMount: function() {
        emitter.on('change-category', function(newCat) {
            var active = false;
            if ( newCat.id == this.props.cat.id ) active = true;
            this.setState({ active: active });
        }.bind(this));
    },
    render: function() {
        var catClass = this.state.active ? 'item active' : 'item';
        return ( React.createElement("li", {className: catClass, onClick: this.toggle}, this.props.cat.category) );
    }
});

var SingleProduct = React.createClass({displayName: "SingleProduct",
    addToCart: function() {
        emitter.emit('add-to-cart', this.props.product);
    },
    render: function() {
        return (
            React.createElement("li", {className: "item clearRow", onClick: this.addToCart}, 
                React.createElement("div", {className: "clearRow"}, 
                    React.createElement("div", {className: "name left"}, this.props.product.name), 
                    React.createElement("div", {className: "price right"},  StoreService.renderPrice( this.props.product.price) )
                ), 
                React.createElement("div", {className: "description muted-text"}, this.props.product.description)
            )
        );
    }
});
/*
 * Main Cart directive
 *
 */
var Cart = React.createClass({displayName: "Cart",
    getInitialState: function() {
        return {
            cartItems: [],
            subtotal: 0,
            tax: 0,
            total: 0
        };
    },

    renderCartProducts: function() {
        return $.map( this.state.cartItems, function(product, i) {
            var id = String(product.id) + i;
            return React.createElement(SingleCartProduct, {key: id, product: product});
        });
    },

    calculateTotals: function() {
        var subtotal = 0;
        var tax = 0;
        var total = 0;

        for (var i=0; i<this.state.cartItems.length; i++) {
            subtotal += this.state.cartItems[i].price;
            tax += this.state.cartItems[i].tax;
        }
        total = subtotal + tax;
        this.setState({
            subtotal: subtotal,
            tax: tax,
            total: total
        });
    },

    componentWillMount: function() {
        emitter.on('add-to-cart', function(newProduct) {
            var newCartItems = this.state.cartItems;
            newProduct._uniqueID = (new Date()).getTime();
            newCartItems.push( newProduct );
            this.calculateTotals();
            this.setState({ active: newCartItems });
        }.bind(this));

        emitter.on('remove-from-cart', function(product) {
            var cartItems = this.state.cartItems;
            for (var i=0; i<cartItems.length; i++) {
                if ( product._uniqueID == cartItems[i]._uniqueID ) {
                    cartItems.splice(i, 1);
                    break;
                }
            }
            this.calculateTotals();
            this.setState({ active: cartItems });
        }.bind(this));
    },

    render: function() {
        var itemsMsgClass = this.state.cartItems.length ? 'hide' : 'muted-text center';
        return (
            React.createElement("div", {className: "cartContainer", "ng-controller": "cartCtrl"}, 
                React.createElement("h1", null, "Your Cart"), 
                React.createElement("div", {className: "cartItemsContainer"}, 
                    React.createElement("div", {className: itemsMsgClass}, "There are no items in the cart"), 
                    React.createElement("ul", {className: "list"}, 
                         this.renderCartProducts() 
                    )
                ), 

                React.createElement("div", {className: "cartTotalsContainer"}, 
                    React.createElement("div", {className: "clearRow line subtotal"}, 
                        React.createElement("div", {className: "title left"}, "Subtotal:"), 
                        React.createElement("div", {className: "amount right"},  StoreService.renderPrice( this.state.subtotal) )
                    ), 
                    React.createElement("div", {className: "clearRow line tax"}, 
                        React.createElement("div", {className: "title left"}, "Tax:"), 
                        React.createElement("div", {className: "amount right"},  StoreService.renderPrice( this.state.tax) )
                    ), 
                    React.createElement("div", {className: "clearRow line total"}, 
                        React.createElement("div", {className: "title left"}, "Total:"), 
                        React.createElement("div", {className: "amount right"},  StoreService.renderPrice( this.state.total) )
                    )
                ), 

                React.createElement("div", {className: "checkoutContainer"}, 
                    React.createElement("button", {className: "checkout"}, 
                        "Checkout"
                    )
                )
            )
        );
    }
});

var SingleCartProduct = React.createClass({displayName: "SingleCartProduct",
    removeItem: function() {
        emitter.emit('remove-from-cart', this.props.product);
    },
    render: function() {
        return (
            React.createElement("li", {className: "item clearRow"}, 
                React.createElement("div", {className: "name left"}, this.props.product.name), 
                React.createElement("div", {className: "price right"}, 
                     StoreService.renderPrice( this.props.product.price), 
                    React.createElement("span", {className: "remove", onClick: this.removeItem}, "x")
                )
            )
        );
    }
});