import {homeView} from './components/home';
import {storeView} from './components/store';

const choo = require('choo');
const http = require('choo/http');
const app = choo();

const loadMenu = function(action, state, send) {
    http.get('../menu.json', { json: true }, function (err, res, body) {
        if (err) return send('app:error', {
            payload: err.message
        });
        if (res.statusCode !== 200 || !body) {
            // return send('app:error', {
            //     payload:'something went wrong'
            // })
            console.log('error while loading');
        }
        send('updateMenu', {
            payload: body
        })
    })
};

app.model({
    state: {
        menu: [],
        cart: []
    },
    effects: {
        loadMenu,
        menuLoaded: (action, state) => {
            console.group('updateMenu');
            console.log('action', action);
            console.log('state', state);
            console.groupEnd();
        }
    },
    reducers: {
        updateMenu: (action, state) => ({ menu: action.payload })
    }
});

app.router((route) => [
    route('/', homeView),
    route('/store', storeView)
]);

const tree = app.start();
document.getElementById('mainContainer').appendChild(tree);
