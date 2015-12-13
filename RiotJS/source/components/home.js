import Riot from 'riot';

const template = `
    <div class="home-page">
        <div class="container">
            <h1 onclick="{hallo}">Start shopping now!</h1>
            <a href="#/store" class="button">Enter Store</a>
        </div>
    </div>`;

const constructor = function() {
    this.hallo = () => {
        console.log('Hallo!');
    }
};

export const home = Riot.tag('home', template, constructor);
