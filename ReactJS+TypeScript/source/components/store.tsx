/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MAIN_CONTAINER_ID } from '../constants';

interface IStoreProps {}
interface IStoreStats {}

export class Store extends React.Component<IStoreProps, IStoreStats> {

    public state: any;

    constructor (props: any) {
        super(props);
    }

    public render () {
        return (
            <div className="store-page">
                <div className="container clearRow">
                </div>
            </div>
        );
    }
}
