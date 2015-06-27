
module storeApp.homePage {

    var homeHTML = [
        '<div class="home-page">',
            '<div class="container">',
                '<h1>Start shopping now</h1>',
                '<button>Enter Store</button>',
            '</div>',
        '</div>'
    ].join('');

    /**
     * Show Home Page
     */
    export function show() {
        var $mainContainer = storeApp.getMainContainer();

        $mainContainer.innerHTML = homeHTML;

        $mainContainer.getElementsByTagName('button')[0]
            .addEventListener('click', function (e) {
                console.log('Open store');
            });
    }
}