const choo = require('choo');

const hallo = (e) => {
    console.log('Hallo!');
};

export const homeView = (params, state, send) => {
    send('loadMenu');

    return choo.view`
    <div class="home-page">
        <div class="container">
            <h1 onclick=${hallo}>Start shopping now!</h1>
            <a href="/store" class="button">Enter Store</a>
        </div>
    </div>`;
};
