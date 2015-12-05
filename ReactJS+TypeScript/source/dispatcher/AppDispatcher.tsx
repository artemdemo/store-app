/// <reference path="../d.ts/flux/flux.d.ts" />

import * as Flux from 'flux';
import {ShelfStore} from '../stores/ShelfStore';

interface IAppAction {
    type: string;
    data?: any;
}

var Dispatcher: Flux.Dispatcher<IAppAction> = new Flux.Dispatcher();

export {Dispatcher};
