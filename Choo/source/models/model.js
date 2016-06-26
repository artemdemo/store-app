const http = require('choo/http');

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

const loadMenu = function(action, state, send) {
    // If menu is already loaded I will not load it again
    // It can be overrided by passing `force: true`
    // `send('loadMenu', { force: true });`
    // But keep in mind that it may case infinite loop of server requests:
    // component loaded -> load menu -> change state -> reload component -> load menu -> change state -> ...
    if (state.menu.length > 0 && !action.force) {
        return;
    }
    http.get('../menu.json', { json: true }, function (err, res, body) {
        if (err) return send('app:error', {
            payload: err.message
        });
        if (res.statusCode !== 200 || !body) {
            return send('app:error', {
                payload:'something went wrong'
            })
        }
        send('updateMenu', {
            payload: body
        })
    })
};

export const model = {
    state: {
        menu: [],
        currentCategoryId: null,
        cart: []
    },
    effects: {
        loadMenu
    },
    reducers: {
        updateMenu: (action, state) => {
            let newState = {
                menu: action.payload
            };
            if (!state.currentCategoryId && action.payload.length > 0) {
                newState.currentCategoryId = action.payload[0].id
            }
            return newState
        },
        selectCategory: (action, state) => ({ currentCategoryId: action.payload }),
        addToCart: (action, state) => {
            const newItem = action.payload;
            const rnd = Math.floor(Math.random() * (10000 - 1)) + 1;
            newItem._uniqueId = hashCode(action.payload.id + rnd);
            return {
                cart: [
                    ...state.cart,
                    newItem
                ]
            }
        },
        removeFromCart: (action, state) => {
            for (let i=0; i<state.cart.length; i++) {
                if (state.cart[i]._uniqueId == action.payload) {
                    return {
                        cart: [
                            ...state.cart.slice(0, i),
                            ...state.cart.slice(i+1)
                        ]
                    };
                }
            }
            return {
                cart: state.cart
            };
        }
    }

};