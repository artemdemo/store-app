import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Injectable, Inject} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class StoreService {
    static menu: Observable<any> = null;
    static currency = '$';

    constructor(@Inject(Http) private Http) {
    }

    getMenu(): Observable<any> {
        StoreService.menu = StoreService.menu || this.Http.get('../menu.json');
        return StoreService.menu;
    }

    renderPrice(price) {
        return StoreService.currency + price.toFixed(2);
    }
}
