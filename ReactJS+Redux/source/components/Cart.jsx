import * as React from 'react';
import {connect} from 'react-redux';
import CartItem from './CartItem';

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        const {cart} = this.props;
        const classStr = cart.length == 0 ? 'muted-text center' : 'muted-text center hide';
        
        return (
            <div className="cartContainer">
                <h1>Your Cart</h1>
                <div className="cartItemsContainer">
                    <div className={classStr}>There are no items in the cart</div>
                    <ul className="list">
                        {cart.map(item => (
                            <CartItem item={item} key={'cart-' + item._uniqueId}></CartItem>
                        ))}
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

export default connect(
    state => {
        return {
            cart: state.cart
        }
    },
    {}
)(Cart);
