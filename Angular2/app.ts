/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/custom.d.ts" />
/// <reference path="vendor/fetch/fetch.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import {routerInjectables, Router, RouterOutlet, RouterLink, RouteConfig} from 'angular2/router';
import { RootRouter } from 'angular2/src/router/router';
import { bind } from 'angular2/di';
import { Pipeline } from 'angular2/src/router/pipeline';

import {Home} from './components';
import {Store} from './components';

/**
 * Store component
 * Main component of the application
 */
@Component({
    selector: 'app'
})
@View({
    template: `
    <div id="mainContainer">
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [
        RouterOutlet,
        RouterLink
    ]
})
@RouteConfig([
    {
        path: '/',
        redirectTo: '/home'
    },
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

    constructor( router: Router ) {

        fetch('../menu.json', {
            method: 'GET'
        })
            .then((response) => {
                return ( <any> response).json();
            })
            .then((json) => {
                console.log( json );
            })
            .catch((error) => {
                console.log(error.message);
            });

        console.log( router );

    }
}

bootstrap(AppComponent, [
    routerInjectables
]);