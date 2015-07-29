/*
 * Main Cart directive
 *
 */
var Cart = React.createClass({
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
            return <SingleCartProduct key={id} product={product} />;
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
            <div className="cartContainer" ng-controller="cartCtrl">
                <h1>Your Cart</h1>
                <div className="cartItemsContainer">
                    <div className={itemsMsgClass}>There are no items in the cart</div>
                    <ul className="list">
                        { this.renderCartProducts() }
                    </ul>
                </div>

                <div className="cartTotalsContainer">
                    <div className="clearRow line subtotal">
                        <div className="title left">Subtotal:</div>
                        <div className="amount right">{ StoreService.renderPrice( this.state.subtotal ) }</div>
                    </div>
                    <div className="clearRow line tax">
                        <div className="title left">Tax:</div>
                        <div className="amount right">{ StoreService.renderPrice( this.state.tax ) }</div>
                    </div>
                    <div className="clearRow line total">
                        <div className="title left">Total:</div>
                        <div className="amount right">{ StoreService.renderPrice( this.state.total ) }</div>
                    </div>
                </div>

                <div className="checkoutContainer">
                    <button className="checkout">
                        Checkout
                    </button>
                </div>
            </div>
        );
    }
});

var SingleCartProduct = React.createClass({
    removeItem: function() {
        emitter.emit('remove-from-cart', this.props.product);
    },
    render: function() {
        return (
            <li className="item clearRow">
                <div className="name left">{this.props.product.name}</div>
                <div className="price right">
                    { StoreService.renderPrice( this.props.product.price ) }
                    <span className="remove" onClick={this.removeItem}>x</span>
                </div>
            </li>
        );
    }
});