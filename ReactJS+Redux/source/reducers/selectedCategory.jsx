import * as constants from '../constants';

export default function selectedCategory(state = [], action) {
    switch (action.type) {
        case  constants.SELECT_CATEGORY:
            return action.categoryId;
        default:
            return state;
    }
}