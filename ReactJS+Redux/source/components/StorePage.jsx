import * as React from 'react';

import Shelf from './Shelf';
import Cart from './Cart';

export default class StorePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        return (
            <div className="store-page">
                <div className="container clearRow">
                    <Shelf></Shelf>
                    <Cart></Cart>
                </div>
            </div>
        );
    }
}