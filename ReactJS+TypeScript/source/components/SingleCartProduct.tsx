/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {ShelfStore, IItem} from "../stores/ShelfStore";
import {StoreAction} from '../actions/StoreAction';

interface ISingleCartProductProps {
    key: string;
    product: IItem;
}
interface ISingleCartProductStats {}

export class SingleCartProduct extends React.Component<ISingleCartProductProps, ISingleCartProductStats> {
    constructor() {
        super();
    };

    public removeItem = () => {
        StoreAction.removeItemFromCart(this.props.product)
    };

    public render() {
        return (
            <li className="item clearRow">
                <div className="name left">{this.props.product.name}</div>
                <div className="price right">
                    {ShelfStore.renderPrice(this.props.product.price)}
                    <span className="remove" onClick={this.removeItem}>x</span>
                </div>
            </li>
        )
    };
}