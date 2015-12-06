/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ShelfStore_1 = require('../stores/ShelfStore');
var StoreAction_1 = require('../actions/StoreAction');
var SingleCategory_1 = require('../components/SingleCategory');
var SingleProduct_1 = require('../components/SingleProduct');
var Shelf = (function (_super) {
    __extends(Shelf, _super);
    function Shelf(props) {
        var _this = this;
        _super.call(this, props);
        this.updateShelf = function () {
            var category = ShelfStore_1.ShelfStore.getCurrentCategory();
            if (category) {
                _this.setState({
                    items: category.items
                });
            }
        };
        this.state = {
            items: []
        };
        StoreAction_1.StoreAction.loadItems();
    }
    ;
    Shelf.prototype.componentDidMount = function () {
        ShelfStore_1.ShelfStore.on('change-category', this.updateShelf);
        this.updateShelf();
    };
    ;
    Shelf.prototype.componentWillUnmount = function () {
        ShelfStore_1.ShelfStore.removeListener('change-category', this.updateShelf);
    };
    ;
    Shelf.prototype.renderCategoryItems = function () {
        return ShelfStore_1.ShelfStore.getMenu().map(function (category, i) {
            var id = String(category.id) + i;
            return React.createElement(SingleCategory_1.SingleCategory, {"key": id, "cat": category});
        });
    };
    ;
    Shelf.prototype.renderProducts = function () {
        return this.state.items.map(function (product, i) {
            var id = String(product.id) + i;
            return React.createElement(SingleProduct_1.SingleProduct, {"key": id, "product": product});
        });
    };
    ;
    Shelf.prototype.render = function () {
        return (React.createElement("div", {"className": "shelfContainer"}, React.createElement("div", {"className": "categoriesContainer"}, React.createElement("ul", {"className": "list clearRow"}, this.renderCategoryItems())), React.createElement("div", {"className": "itemsContainer"}, React.createElement("ul", {"className": "list"}, this.renderProducts()))));
    };
    ;
    return Shelf;
})(React.Component);
exports.Shelf = Shelf;
