import * as constants from '../constants';

export default function cart(state = [], action) {
    switch (action.type) {
        case  constants.ADD_PRODUCT_TO_CART:
            return [
                ...state,
                Object.assign({}, action.product)
            ];
        case constants.REMOVE_PRODUCT_FROM_CART:
            for (let i=0; i<state.length; i++) {
                if (state[i].id == action.todo.id) {
                    return [
                        ...state.slice(0, i),
                        ...state.slice(i+1)
                    ];
                }
            }
            return state;
        default:
            return state;
    }
}