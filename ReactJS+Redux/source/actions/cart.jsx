import * as constants from '../constants';

export function addToCart(product) {
    return {
        type: constants.ADD_PRODUCT_TO_CART,
        product
    }
}

export function removeFromCart(_uniqueId) {
    return {
        type: constants.REMOVE_PRODUCT_FROM_CART,
        _uniqueId
    }
}
