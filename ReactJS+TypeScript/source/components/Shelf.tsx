/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MAIN_CONTAINER_ID} from '../constants';

import {ShelfStore, ICategory, IItem} from '../stores/ShelfStore';
import {StoreAction} from '../actions/StoreAction';
import {SingleCategory} from '../components/SingleCategory';
import {SingleProduct} from '../components/SingleProduct';

interface IShelfProps {}
interface IShelfStats {
    items: IItem[]
}


export class Shelf extends React.Component<IShelfProps, IShelfStats> {

    public state: IShelfStats;

    constructor(props: IShelfProps) {
        super(props);
        this.state = {
            items: []
        };
        StoreAction.loadItems();
    }

    private updateShelf(): void {
        let category: ICategory = ShelfStore.getCurrentCategory();
        this.setState({
            items: category.items
        });
    }

    public componentDidMount(): void {
        ShelfStore.on('change-category', this.updateShelf.bind(this));
    }

    public componentWillUnmount(): void {
        ShelfStore.removeListener('change-category', this.updateShelf.bind(this));
    }

    public renderCategoryItems() {
        return ShelfStore.getMenu().map((category: ICategory, i: number) => {
            let id = String(category.id) + i;
            return <SingleCategory key={id} cat={category} />;
        })
    }

    public renderProducts() {
        return this.state.items.map((product: IItem, i: number) => {
            let id = String(product.id) + i;
            return <SingleProduct key={id} product={product} />;
        })
    }

    public render() {
        return (
            <div className="shelfContainer">
                <div className="categoriesContainer">
                    <ul className="list clearRow">
                        {this.renderCategoryItems()}
                    </ul>
                </div>
                <div className="itemsContainer">
                    <ul className="list">
                        {this.renderProducts()}
                    </ul>
                </div>
            </div>
        );
    }
}
