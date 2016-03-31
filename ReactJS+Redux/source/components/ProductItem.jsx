import * as React from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../actions/cart';

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        const {product, addToCart} = this.props;

        const addToCartThisProduct = () => {
            addToCart(product)
        };

        return (
            <li className="item clearRow" onClick={addToCartThisProduct}>
                <div className="clearRow">
                    <div className="name left">{product.name}</div>
                    <div className="price right">${product.price}</div>
                </div>
                <div className="description muted-text">
                    {product.description}
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
        addToCart
    }
)(ProductItem);