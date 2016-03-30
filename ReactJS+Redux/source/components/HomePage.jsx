import * as React from 'react';
import {Link} from 'react-router';

export default class HomePage extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        return (
            <div className="home-page">
                <div className="container">
                    <h1>Start shopping now</h1>
                    <Link to="/store" className="button">Enter Store</Link>
                </div>
            </div>
        );
    }
}