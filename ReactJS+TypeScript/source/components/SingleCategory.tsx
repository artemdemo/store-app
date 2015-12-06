/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {ShelfStore, ICategory} from '../stores/ShelfStore';
import {StoreAction} from '../actions/StoreAction';

interface ISingleCategoryProps {
    key: string;
    cat: ICategory;
}

interface ISingleCategoryStats {
    active: boolean;
}

let singleCategoryContext;

export class SingleCategory extends React.Component<ISingleCategoryProps, ISingleCategoryStats> {

    public state: ISingleCategoryStats;

    constructor(props: ISingleCategoryProps) {
        super(props);
        this.state = {
            active: false
        };
        singleCategoryContext = this;
    };

    public toggleCategory = () => {
        StoreAction.setCategory(this.props.cat);
        this.setState({
            active: !this.state.active
        });
    };

    private updateCategory = () => {
        let active: boolean = false;
        let newCategory: ICategory = ShelfStore.getCurrentCategory();
        if ( newCategory.id == this.props.cat.id ) active = true;
        this.setState({
            active: active
        });
    };

    public componentDidMount() {
        ShelfStore.on('change-category', this.updateCategory);
    };

    public componentWillUnmount(): void {
        ShelfStore.removeListener('change-category', this.updateCategory);
    };

    public render() {
        var catClass = this.state.active ? 'item active' : 'item';
        return (
            <li className={catClass} onClick={this.toggleCategory}>
                {this.props.cat.category}
            </li>
        );
    };
}
