/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/custom.d.ts" />
/// <reference path="vendor/fetch/fetch.d.ts" />

import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {routerInjectables, Router, RouterOutlet, RouterLink} from 'angular2/router';

/**
 * Store component
 * Main component of the application
 */
@Component({
    selector: 'store'
})
@View({
    template: `
    <div class="home-page">

        <div class="container">
            <h1>Start shopping now</h1>
            <button>Enter Store</button>
        </div>

    </div>
    `
})
class StoreComponent {

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

bootstrap(StoreComponent, [
    routerInjectables
]);