/// <reference path="typings/tsd.d.ts" />

import { Component, View, bootstrap, bind } from 'angular2/angular2';
import { Http, httpInjectables } from "angular2/angular2";
import { RouteConfig, RouterOutlet, Router, RouterLink } from 'angular2/router';
import { routerInjectables, LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';

import {Home} from './components';
import {Store} from './components';

/**
 * Store component
 * Main component of the application
 */
@Component({
    appInjector: [httpInjectables],
    selector: 'app'
})
@View({
    template: `
    <div id="mainContainer">
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [RouterOutlet]
})
@RouteConfig([
    { path: '/', redirectTo: '/home' },
    {
        path: '/home',
        component: Home,
        as: 'home'
    },
    {
        path: '/store',
        component: Store,
        as: 'store'
    },
])
export class AppComponent {

    constructor( http:Http ) {

        http.get('../menu.json')
            .toRx()
            .subscribe(res => {
                console.log(res.json());
            });

    }
}

bootstrap(AppComponent, [
    httpInjectables,
    routerInjectables,
    bind(LocationStrategy).toClass(HashLocationStrategy) // This part will be gone in post alpha
]);