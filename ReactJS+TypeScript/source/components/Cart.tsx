/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {CartStore} from '../stores/CartStore';
import {ShelfStore} from '../stores/ShelfStore';
import {SingleCartProduct} from '../components/SingleCartProduct';
import {MAIN_CONTAINER_ID} from '../constants';

interface ICartProps {}
interface ICartStats {}

export class Cart extends React.Component<ICartProps, ICartStats> {

    public state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            items: []
        }
    };

    private updateCart = () => {
        this.setState({
            items: CartStore.getItems()
        })
    };

    public renderCartProducts() {
        return this.state.items.map((product, i) => {
            var id = String(product.id) + i;
            return <SingleCartProduct key={id} product={product} />;
        })
    };

    public componentDidMount(): void {
        CartStore.on('update-cart', this.updateCart);
        this.updateCart();
    };

    public componentWillUnmount(): void {
        CartStore.removeListener('update-cart', this.updateCart);
    };

    public render() {
        let itemsMsgClass = this.state.items.length == 0 ? 'muted-text center' : 'hide';
        return (
            <div className="cartContainer" ng-controller="cartCtrl">
                <h1>Your Cart</h1>
                <div className="cartItemsContainer">
                    <div className={itemsMsgClass} >There are no items in the cart</div>
                    <ul className="list">
                        {this.renderCartProducts()}
                    </ul>
                </div>

                <div className="cartTotalsContainer">
                    <div className="clearRow line subtotal">
                        <div className="title left">Subtotal:</div>
                        <div className="amount right">{ShelfStore.renderPrice(CartStore.getSubtotal())}</div>
                    </div>
                    <div className="clearRow line tax">
                        <div className="title left">Tax:</div>
                        <div className="amount right">{ShelfStore.renderPrice(CartStore.getTax())}</div>
                    </div>
                    <div className="clearRow line total">
                        <div className="title left">Total:</div>
                        <div className="amount right">{ShelfStore.renderPrice(CartStore.getTotal())}</div>
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
}
