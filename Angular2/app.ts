/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/custom.d.ts" />
/// <reference path="vendor/fetch/fetch.d.ts" />

import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {routerInjectables, Router, RouterOutlet, RouterLink, RouteConfig} from 'angular2/router';

import {Home} from './components';

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
        //component: Home
    },
    {
        path: '/home',
        component: Home
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

    }
}

bootstrap(AppComponent, [
    routerInjectables
]);