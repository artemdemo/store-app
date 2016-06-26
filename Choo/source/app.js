import {model} from './models/model';
import {appModel} from './models/appModel';
import {homeView} from './components/home';
import {storeView} from './components/store';

const choo = require('choo');
const app = choo();

app.model(model);
app.model(appModel);

app.router((route) => [
    route('/', homeView),
    route('/store', storeView)
]);

const tree = app.start();
document.getElementById('mainContainer').appendChild(tree);
