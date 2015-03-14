/*global React, $, document, console, emitter*/

// ToDo MVC tutorial: https://www.codementor.io/reactjs/tutorial/react-js-flux-architecture-tutorial



/**
 * Main instanse of Store object
 *
 * @type {Object}
 */
var store = null;

/**
 * Initialiazing new emitter
 */
function Job(){
    EventEmitter.call(this);
}
Job.prototype = new EventEmitter;
var emitter = new Job;

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
        items: store.currentCategory.items
    };
  },
  
  renderCategoryItems: function() {
    return $.map( store.menu, function(cat) {
        return React.createElement(SingleCategory, {cat: cat});
    });
  },
  
  renderProducts: function() {
    return $.map( this.state.items, function(product) {
        return React.createElement(SingleProduct, {product: product});
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
        if ( this.props.cat.id == store.currentCategory.id ) active = true;
        return {
            active: active
        };
    },
    toggle: function() {
        store.changeCategory(this.props.cat);
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
                React.createElement("div", {className: "price right"},  store.renderPrice( this.props.product.price) )
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
    return $.map( this.state.cartItems, function(product) {
        return React.createElement(SingleCartProduct, {product: product});
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
        newProduct._uniqueID = (new Date).getTime();
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
                    React.createElement("div", {className: "amount right"},  store.renderPrice( this.state.subtotal) )
                ), 
                React.createElement("div", {className: "clearRow line tax"}, 
                    React.createElement("div", {className: "title left"}, "Tax:"), 
                    React.createElement("div", {className: "amount right"},  store.renderPrice( this.state.tax) )
                ), 
                React.createElement("div", {className: "clearRow line total"}, 
                    React.createElement("div", {className: "title left"}, "Total:"), 
                    React.createElement("div", {className: "amount right"},  store.renderPrice( this.state.total) )
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
                 store.renderPrice( this.props.product.price), 
                React.createElement("span", {className: "remove", onClick: this.removeItem}, "x")
            )
        )
    );
  }
});


/**
 * Main Store object
 *
 * @class StoreClass
 */
var StoreClass = function() {

    var self = this;

    var MenuService = new MenuClass();
    
    var currency = '$';
    
    this.menu = [];
    this.currentCategory = {};

    /**
     * Initialization
     *
     * @function init
     */
    this.init = function() {
        $.when( MenuService.loadMenu() )
        .then(function(data){
            self.menu = data;
            self.currentCategory = data[0];
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
    this.changeCategory = function(newCategory) {
        MenuService.setCurrentCategory( newCategory );
    };
    
    this.renderPrice = function( price ) {
        return currency + price.toFixed(2);
    };
    
    
};


/**
 * Menu object
 *
 * @class MenuClass
 */
var MenuClass = function() {

    var self = this;
    
    /* constants */
    var menuUrl = '../../menu.json';
    
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
    this.loadMenu = function() {
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
    this.getMenu = function() { return Menu; };
    
    /**
     * Set category to current
     *
     * @function setCurrentCategory
     */
    this.setCurrentCategory = function(newCategory) { currentCategory = newCategory; };
    
    /**
     * Get current category
     *
     * @function getCurrentCategory
     * @return {Object}
     */
    this.getCurrentCategory = function() { return currentCategory; };

};


/**
 * Wait until DOM is ready
 */
$(document).ready(function(){
    store = new StoreClass();
    store.init();
});

