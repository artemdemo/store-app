
module storeApp {

    var mainContainer: HTMLDivElement;

    /**
     * Initialization of storeApp
     */
    export function init() {
        history.init();

        mainContainer = <HTMLDivElement> document.getElementById('mainContainer');

        storeApp.homePage.show();
    }

    /**
     * Return main container element
     * @returns {HTMLDivElement}
     */
    export function getMainContainer() { return mainContainer }
}