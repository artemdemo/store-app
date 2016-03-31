import * as React from 'react';
import {connect} from 'react-redux';
import {selectCategory} from '../actions/categories';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        const {category, selectedCategory, selectCategory} = this.props;
        const classStr = selectedCategory == category.id ? 'item active' : 'item';

        const selectThisCategory = () => {
            selectCategory(category.id)
        };

        return (
            <li className={classStr} onClick={selectThisCategory}>
                {category.category}
            </li>
        );
    }
}

export default connect(
    state => {
        return {
            selectedCategory: state.selectedCategory
        }
    },
    {
        selectCategory
    }
)(CategoryItem);