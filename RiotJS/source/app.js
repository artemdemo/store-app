import Riot from 'riot';
import Route from 'riot-route';

import {home} from './components/home';
import {store} from './components/store';

import {MenuService} from './models/MenuService';

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
Route('/store', () => changePage('store'));

/**
 * Start routing and execute route for current url
 *
 * Following is shorthand for
 * Route.start();
 * Route.exec();
 */
Route.start(true);
