import Riot from 'riot';
import Route from 'riot-route';

/**
 * I don't see any other way but include all component dependencies in the main file.
 * Case I can't use `import` inside of function or `script` tags
 */
import home from './components/home';
import store from './components/store';
    import cart from './components/cart';
    import shelf from './components/shelf';

let mainContainerEl = document.getElementById('mainContainer');
let currentPage;

let changePage = (newPage) => {
    currentPage = Riot.mount(mainContainerEl, newPage);
};

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
