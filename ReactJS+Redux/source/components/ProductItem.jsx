import * as React from 'react';

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        const {product} = this.props;

        return (
            <li className="item clearRow">
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