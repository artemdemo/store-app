import * as constants from '../constants';

export function selectCategory(categoryId) {
    return {
        type: constants.SELECT_CATEGORY,
        categoryId
    }
}
