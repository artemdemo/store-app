import {Component, View, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from './Home';
import {Store} from './Store';
import {StoreService} from './StoreService';

@Component({
    selector: 'store-app',
    providers: [StoreService]
})
@View({
    directives: [ROUTER_DIRECTIVES],
    template: `
    <div id="mainContainer">
        <router-outlet></router-outlet>
    </div>
    `
})
@RouteConfig([
    { path: '/', component: Home, as: 'HomePage' },
    { path: '/store', component: Store, as: 'StorePage' }
])
export class StoreApp {
    constructor(@Inject(StoreService) StoreService) {
        StoreService.getMenu();
    }
}
