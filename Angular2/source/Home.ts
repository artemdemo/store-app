import {Component, View} from 'angular2/core';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'home'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    template: `
    <div class="home-page">
            <div class="container">
                <h1>Start shopping now</h1>
                <a [routerLink]="['/StorePage']" class="button">Enter Store</a>
        </div>
    </div>
    `
})
export class Home {
    constructor() {}
}
