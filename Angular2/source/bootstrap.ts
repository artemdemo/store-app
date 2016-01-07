import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
// import 'es6-shim';

import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {StoreApp} from './app';

// Uncomment following line in order to enable Production Mode
// enableProdMode();

bootstrap(StoreApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);