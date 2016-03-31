import * as React from 'react';
import {connect} from 'react-redux';

class CartTotals extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {cart} =  this.props;
        let subtotal = 0;
        let tax = 0;
        let total = 0;

        cart.forEach(item => {
            subtotal += item.price;
            tax += item.tax;
        });

        total = subtotal + tax;

        return (
            <div className="cartTotalsContainer">
                <div className="clearRow line subtotal">
                    <div className="title left">Subtotal:</div>
                    <div className="amount right">${subtotal.toFixed(2)}</div>
                </div>
                <div className="clearRow line tax">
                    <div className="title left">Tax:</div>
                    <div className="amount right">${tax.toFixed(2)}</div>
                </div>
                <div className="clearRow line total">
                    <div className="title left">Total:</div>
                    <div className="amount right">${total.toFixed(2)}</div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            cart: state.cart
        }
    },
    {}
)(CartTotals);
