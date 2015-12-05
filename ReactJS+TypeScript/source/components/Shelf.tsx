/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MAIN_CONTAINER_ID} from '../constants';

import {ShelfStore, ICategory, IItem} from '../stores/ShelfStore';
import {StoreAction} from '../actions/StoreAction';
import {SingleCategory} from '../components/SingleCategory';

interface IShelfProps {}
interface IShelfStats {
    items: IItem[]
}

export class Shelf extends React.Component<IShelfProps, IShelfStats> {

    public state: any;

    constructor(props: IShelfProps) {
        super(props);
        StoreAction.loadItems();
    }

    private onChange() {}

    public componentDidMount(): void {
        ShelfStore.on('change', this.onChange);
    }

    public componentWillUnmount(): void {
        ShelfStore.removeListener('change', this.onChange);
    }

    public renderCategoryItems() {
        return ShelfStore.getMenu().map((category: ICategory, i: number) => {
            var id = String(category.id) + i;
            return <SingleCategory key={id} cat={category} />;
        })
    }

    public renderProducts() {}

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
