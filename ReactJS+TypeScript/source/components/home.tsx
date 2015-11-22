/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MAIN_CONTAINER_ID } from '../constants';

interface IHomeProps {}
interface IHomeStats {}

export class Home extends React.Component<IHomeProps, IHomeStats> {

    public state: any;

    constructor (props: any) {
        super(props);
    }

    public openStore () {
        ReactDOM.unmountComponentAtNode(document.getElementById(MAIN_CONTAINER_ID));
    }

    public render () {
        return (
            <div className="home-page">
                <div className="container">
                    <h1>Start shopping now</h1>
                    <button onClick={this.openStore} className="button">Enter Store</button>
                </div>
            </div>
        );
    }
}
