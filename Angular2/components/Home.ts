/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/custom.d.ts" />
/// <reference path="../vendor/fetch/fetch.d.ts" />

import {Component, View, bootstrap, bind} from 'angular2/angular2';

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
            <button>Enter Store</button>
        </div>

    </div>
    `
})
export class Home {

    constructor() {

    }
}