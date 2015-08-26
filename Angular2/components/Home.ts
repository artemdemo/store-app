/// <reference path="../typings/tsd.d.ts" />

import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {routerInjectables, Router, RouterOutlet, RouterLink, RouteConfig} from 'angular2/router';

/**
 * Store component
 * Main component of the application
 */
@Component({
    selector: 'home'
})
@View({
    template: `
    <div class="home-page">

        <div class="container">
            <h1>Start shopping now</h1>
            <button (click)="openStore()">Enter Store</button>
        </div>

    </div>
    `,
    directives: [
        RouterOutlet,
        RouterLink
    ]
})
export class Home {

    router;

    constructor( router: Router ) {
        this.router = router;
    }

    openStore() {
        this.router.navigate('/store');
    }
}