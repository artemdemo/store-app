/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CartStore_1 = require('../stores/CartStore');
var ShelfStore_1 = require('../stores/ShelfStore');
var SingleCartProduct_1 = require('../components/SingleCartProduct');
var Cart = (function (_super) {
    __extends(Cart, _super);
    function Cart(props) {
        var _this = this;
        _super.call(this, props);
        this.updateCart = function () {
            _this.setState({
                items: CartStore_1.CartStore.getItems()
            });
        };
        this.state = {
            items: []
        };
    }
    ;
    Cart.prototype.renderCartProducts = function () {
        return this.state.items.map(function (product, i) {
            var id = String(product.id) + i;
            return React.createElement(SingleCartProduct_1.SingleCartProduct, {"key": id, "product": product});
        });
    };
    ;
    Cart.prototype.componentDidMount = function () {
        CartStore_1.CartStore.on('update-cart', this.updateCart);
        this.updateCart();
    };
    ;
    Cart.prototype.componentWillUnmount = function () {
        CartStore_1.CartStore.removeListener('update-cart', this.updateCart);
    };
    ;
    Cart.prototype.render = function () {
        var itemsMsgClass = this.state.items.length == 0 ? 'muted-text center' : 'hide';
        return (React.createElement("div", {"className": "cartContainer", "ng-controller": "cartCtrl"}, React.createElement("h1", null, "Your Cart"), React.createElement("div", {"className": "cartItemsContainer"}, React.createElement("div", {"className": itemsMsgClass}, "There are no items in the cart"), React.createElement("ul", {"className": "list"}, this.renderCartProducts())), React.createElement("div", {"className": "cartTotalsContainer"}, React.createElement("div", {"className": "clearRow line subtotal"}, React.createElement("div", {"className": "title left"}, "Subtotal:"), React.createElement("div", {"className": "amount right"}, ShelfStore_1.ShelfStore.renderPrice(CartStore_1.CartStore.getSubtotal()))), React.createElement("div", {"className": "clearRow line tax"}, React.createElement("div", {"className": "title left"}, "Tax:"), React.createElement("div", {"className": "amount right"}, ShelfStore_1.ShelfStore.renderPrice(CartStore_1.CartStore.getTax()))), React.createElement("div", {"className": "clearRow line total"}, React.createElement("div", {"className": "title left"}, "Total:"), React.createElement("div", {"className": "amount right"}, ShelfStore_1.ShelfStore.renderPrice(CartStore_1.CartStore.getTotal())))), React.createElement("div", {"className": "checkoutContainer"}, React.createElement("button", {"className": "checkout"}, "Checkout"))));
    };
    return Cart;
})(React.Component);
exports.Cart = Cart;
