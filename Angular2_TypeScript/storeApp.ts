import {Component, Template} from 'annotations';
import {bootstrap, Foreach} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/angularfire';

@Component({
	selector: 'store-app',
	componentServices: []
})
    
@Template({
	url: './__pages/home.html',
	directives: [Foreach]
})
	
class StoreApp {
}

export function main() {
	bootstrap(StoreApp);
}
