import Riot from 'riot';
import Route from 'riot-route';

import {home} from './components/home';
import {store} from './components/store';

import {MenuService} from './models/MenuService';
import {CartObservable} from './observables/CartObservable';

let mainContainerEl = document.getElementById('mainContainer');
let currentPage;

let changePage = (newPage) => {
    currentPage = Riot.mount(mainContainerEl, newPage);
};

MenuService.loadMenu();

/**
 * Default route
 */
Route(() => changePage('home'));

/**
 * Store page
 */
Route('/store', () => {
    changePage('store');

    // ToDo: Mode it from here. I don't like this solution
    CartObservable.on('add-to-cart', currentPage[0].tags.cart.addToCart);
});

/**
 * Start routing and execute route for current url
 *
 * Following is shorthand for
 * Route.start();
 * Route.exec();
 */
Route.start(true);
