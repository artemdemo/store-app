/// <reference path="d.ts/react/react.d.ts" />
/// <reference path="d.ts/react/react-dom.d.ts" />
/// <reference path="d.ts/react-router/react-router.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'

import {Home} from './components/home';
import {Store} from './components/store';
import {MAIN_CONTAINER_ID} from './constants';

ReactDOM.render(
	<Router>
		<Route path="store" component={Store}/>
		<Route path="*" component={Home}/>
	</Router>,
	document.getElementById(MAIN_CONTAINER_ID));
