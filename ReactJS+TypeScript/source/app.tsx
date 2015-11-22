/// <reference path="d.ts/react/react.d.ts" />
/// <reference path="d.ts/react/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Home} from './components/home';
import { MAIN_CONTAINER_ID } from './constants';

ReactDOM.render(
	<Home />,
	document.getElementById(MAIN_CONTAINER_ID));
