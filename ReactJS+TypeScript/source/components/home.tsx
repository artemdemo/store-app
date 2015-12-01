/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />
/// <reference path="../d.ts/react-router/react-router.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router'
import { MAIN_CONTAINER_ID } from '../constants';

interface IHomeProps {}
interface IHomeStats {}

export class Home extends React.Component<IHomeProps, IHomeStats> {

    public state: any;

    constructor (props: any) {
        super(props);
    }

    public render () {
        return (
            <div className="home-page">
                <div className="container">
                    <h1>Start shopping now</h1>
                    <Link to={`/store`} className="button">Enter Store</Link>
                </div>
            </div>
        );
    }
}
