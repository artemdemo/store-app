/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MAIN_CONTAINER_ID} from '../constants';

interface ICartProps {}
interface ICartStats {}

export class Cart extends React.Component<ICartProps, ICartStats> {

    public state: any;

    constructor(props: any) {
        super(props);
    }

    renderCartProducts() {}

    public render() {
        return (
            <div className="cartContainer" ng-controller="cartCtrl">
                <h1>Your Cart</h1>
                <div className="cartItemsContainer">
                    <div>There are no items in the cart</div>
                    <ul className="list">
                        { this.renderCartProducts() }
                    </ul>
                </div>

                <div className="cartTotalsContainer">
                    <div className="clearRow line subtotal">
                        <div className="title left">Subtotal:</div>
                        <div className="amount right"></div>
                    </div>
                    <div className="clearRow line tax">
                        <div className="title left">Tax:</div>
                        <div className="amount right"></div>
                    </div>
                    <div className="clearRow line total">
                        <div className="title left">Total:</div>
                        <div className="amount right"></div>
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
