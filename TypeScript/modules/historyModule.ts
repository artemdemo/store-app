
interface stateObj {
    uID: string;
    id: string;
    title: string;
    url: string;
}

module storeApp.history {

    var historyArr: Array<stateObj> = [];

    var currentState: stateObj = null;

    export function init () {

        // Handle clicking on browsers forward and back buttons
        window.addEventListener('popstate', function( e:any ) {
            if ( !! e.state && e.state.hasOwnProperty('uID') ) {
                nerve.send({
                    channel: 'history',
                    context: { id: e.state.id }
                });
            }
        }, false);
    }

    /**
     * Save state to the browser history
     */
    export function saveState ( stateID: string ) {
        var state: stateObj = {
            uID: String(+new Date()) + String( Math.floor((Math.random() * 1000) + 1) ),
            id: stateID,
            title: 'page ' + stateID,
            url: window.location.pathname + window.location.search + '#' + stateID
        };

        window.history.pushState(
            { id: state.id, uID: state.uID },
            state.title,
            state.url
        );

        historyArr.push( state );
        currentState = state;
    }

}