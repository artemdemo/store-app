import * as constants from '../constants';

export default function todos(state = [], action) {
    switch (action.type) {
        case  constants.UPDATE_MENU:
            return action.menu;
        default:
            return state;
    }
}