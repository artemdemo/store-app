import * as React from 'react';
import { connect } from 'react-redux';
import CategoryItem from './CategoryItem';
import ProductItem from './ProductItem';

class Shelf extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        const {menu, selectedCategory} = this.props;
        let selectedCategoryProducts = [];

        for(var i = 0; i < menu.length; i++) {
            if (menu[i].id == selectedCategory) {
                selectedCategoryProducts = menu[i].items
            }
        }

        return (
            <div className="shelfContainer">
                <div className="categoriesContainer">
                    <ul className="list clearRow">
                        {menu.map(item => (
                            <CategoryItem category={item} key={item.category + item.id}></CategoryItem>
                        ))}
                    </ul>
                </div>
                <div className="itemsContainer">
                    <ul className="list">
                        {selectedCategoryProducts.map(item => (
                            <ProductItem product={item} key={item.name + item.id}></ProductItem>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            menu: state.menu,
            selectedCategory: state.selectedCategory
        }
    }
)(Shelf);
