import * as React from 'react';
import {connect} from 'react-redux';
import {removeFromCart} from '../actions/cart';

class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        const {item, removeFromCart} = this.props;

        const removeThisItem = () => {
            removeFromCart(item._uniqueId)
        };

        return (
            <li className="item clearRow">
                <div className="name left">{item.name}</div>
                <div className="price right">
                    ${item.price}
                    <span onClick={removeThisItem} className="remove">x</span>
                </div>
            </li>
        );
    }
}

export default connect(
    state => {
        return {}
    },
    {
        removeFromCart
    }
)(CartItem);