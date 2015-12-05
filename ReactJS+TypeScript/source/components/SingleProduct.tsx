/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {IItem} from "../stores/ShelfStore";

interface ISingleProductProps {
    key: string;
    product: IItem;
}
interface ISingleProductStats {}

export class SingleProduct extends React.Component<ISingleProductProps, ISingleProductStats> {

    private addToCart() {}

    public render() {
        return (
            <li className="item clearRow" onClick={this.addToCart}>
                <div className="clearRow">
                    <div className="name left">{this.props.product.name}</div>
                    <div className="price right">{this.props.product.price}</div>
                </div>
                <div className="description muted-text">{this.props.product.description}</div>
            </li>
        );
    }

}