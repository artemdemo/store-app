/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/custom.d.ts" />
/// <reference path="../vendor/fetch/fetch.d.ts" />

import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {routerInjectables, Router, RouterOutlet, RouterLink, RouteConfig} from 'angular2/router';

/**
 * Store component
 * Main component of the application
 */
@Component({
    selector: 'store'
})
@View({
    template: `
    <div class="store-page">



    </div>
    `,
    directives: [
        RouterOutlet,
        RouterLink
    ]
})
export class Store {

    router;

    constructor( router: Router ) {
        this.router = router;
    }

    openStore() {
        this.router.navigate('/home');
        console.log( this.router );
    }
}