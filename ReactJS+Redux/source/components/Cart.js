import * as React from 'react';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        return (
            <div className="cartContainer">
                <h1>Your Cart</h1>
                <div className="cartItemsContainer">
                    <div className="muted-text center">There are no items in the cart</div>
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