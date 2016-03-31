import * as constants from '../constants';

export function updateMenu(menu) {
    return {
        type: constants.UPDATE_MENU,
        menu
    }
}
