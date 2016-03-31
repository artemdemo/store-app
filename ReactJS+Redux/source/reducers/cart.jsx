import * as constants from '../constants';

const hashCode = (str) => {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export default function cart(state = [], action) {
    switch (action.type) {
        case  constants.ADD_PRODUCT_TO_CART:
            let rnd = Math.floor(Math.random() * (10000 - 1)) + 1;
            return [
                ...state,
                Object.assign({
                    _uniqueId: hashCode(action.product.id + rnd)
                }, action.product)
            ];
        case constants.REMOVE_PRODUCT_FROM_CART:
            for (let i=0; i<state.length; i++) {
                if (state[i]._uniqueId == action._uniqueId) {
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