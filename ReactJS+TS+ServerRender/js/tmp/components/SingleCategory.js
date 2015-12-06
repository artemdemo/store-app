/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ShelfStore_1 = require('../stores/ShelfStore');
var StoreAction_1 = require('../actions/StoreAction');
var singleCategoryContext;
var SingleCategory = (function (_super) {
    __extends(SingleCategory, _super);
    function SingleCategory(props) {
        var _this = this;
        _super.call(this, props);
        this.toggleCategory = function () {
            StoreAction_1.StoreAction.setCategory(_this.props.cat);
            _this.setState({
                active: !_this.state.active
            });
        };
        this.updateCategory = function () {
            var active = false;
            var newCategory = ShelfStore_1.ShelfStore.getCurrentCategory();
            if (newCategory.id == _this.props.cat.id)
                active = true;
            _this.setState({
                active: active
            });
        };
        this.state = {
            active: false
        };
        singleCategoryContext = this;
    }
    ;
    SingleCategory.prototype.componentDidMount = function () {
        ShelfStore_1.ShelfStore.on('change-category', this.updateCategory);
        this.updateCategory();
    };
    ;
    SingleCategory.prototype.componentWillUnmount = function () {
        ShelfStore_1.ShelfStore.removeListener('change-category', this.updateCategory);
    };
    ;
    SingleCategory.prototype.render = function () {
        var catClass = this.state.active ? 'item active' : 'item';
        return (React.createElement("li", {"className": catClass, "onClick": this.toggleCategory}, this.props.cat.category));
    };
    ;
    return SingleCategory;
})(React.Component);
exports.SingleCategory = SingleCategory;
