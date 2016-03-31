import * as React from 'react';
import {connect} from 'react-redux';
import CartItem from './CartItem';
import CartTotals from './CartTotals';

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
                <CartTotals></CartTotals>
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
