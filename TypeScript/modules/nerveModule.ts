/**
 * Nerve is lightweight javascript library for asynchronous broadcasts along routes and channels.
 * @source https://github.com/artemdemo/nerve
 * (original) https://github.com/jstandish/nerve
 */

interface routesObj {
    [channel: string]: channelObj;
}

interface channelObj {
    [key: string]: Array<msgNerve>;
}

interface msgNerve {
    caller: any;
    callback: any;
}

/**
 * Object that will be passed to ON function
 */
interface onParamObj {
    channel: string;    // The category of a an event
    route?: string;     // The sub category of an event
    callback: ( context: any ) => {}; // A callback to to handle the event
    scope?: any;     // The scope reference you are calling about
}

/**
 * Object that will be passed to SEND function
 */
interface sendParamObj {
    channel: string;    // The category of a an event
    route?: string;     // The sub category of an event
    context?: any;      // Data that will be send to the callback
}

/**
 * Object that will be passed to OFF function
 */
interface offParamObj {
    channel: string;    // The category of a an event
    route?: string;     // The sub category of an event
    scope?: any;        // Scope of the targeting event
}

module storeApp.nerve {

    var routes:routesObj = {};

    var defaultRoute = 'root';

    /**
     * Listen to a given channel or listen to a channel and route combination
     *
     * @param paramObj {onParamObj}
     * @example
     * {
     *     channel: 'some-channel',
     *     route: 'route',
     *     callback: function( context ) {
     *          // some functionality
     *     },
     *     scope: this
     * }
     */
    export function on ( paramObj: onParamObj ):void {

        var caller = null;

        if (
            ! paramObj.hasOwnProperty('channel') ||
            ! paramObj.hasOwnProperty('callback') ||
            ! isFunction( paramObj.callback )
        )
            throw Error('A channel and a callback must be specified');


        if ( ! paramObj.hasOwnProperty('scope') )
            caller = null;
        else
            caller = paramObj.scope || null;

        // Create new route if there is no one
        if ( ! routes.hasOwnProperty( paramObj.channel ) )
            routes[paramObj.channel] = {};

        // If there is no route in paramObj - will create default one
        if ( ! paramObj.hasOwnProperty('route') )
            paramObj.route = defaultRoute;

        // If given paramObj.route not exists in main routes object - create one
        if ( ! routes[paramObj.channel].hasOwnProperty( paramObj.route ) )
            routes[paramObj.channel][ paramObj.route ] = [];

        // Check to make sure we aren't adding ourselves twice
        if (findSubscriber(caller, routes[paramObj.channel][ paramObj.route ]))
            return;

        routes[paramObj.channel][ paramObj.route ].push({
            caller: caller,
            callback: paramObj.callback
        });

    }


    /**
     * Send message
     *
     * @param paramObj {sendParamObj}
     * @example
     * {
     *     channel: 'some-channel',
     *     route: 'route',
     *     context: { someData: true }
     * }
     */
    export function send ( paramObj: sendParamObj ):void {

        if ( ! paramObj.hasOwnProperty('channel') )
            throw Error('A channel must be specified');

        if ( ! paramObj.hasOwnProperty('route') )
            paramObj.route = defaultRoute;

        if ( ! routes.hasOwnProperty( paramObj.channel ) || ! routes[paramObj.channel].hasOwnProperty(paramObj.route) ) {
            return;
        }

        if ( ! paramObj.hasOwnProperty( 'context' ) )
            paramObj.context = null;

        var listeners = routes[paramObj.channel][paramObj.route], i = 0, len = listeners.length;

        for (; i < len; i++) {

            (function (ch, rt, idx) {
                var ref = setTimeout(function () {
                    try {
                        routes[ch][rt][idx].callback.call(
                            routes[ch][rt][idx].caller,
                            paramObj.context
                        );
                        clearTimeout(ref);
                    } catch (e) {
                        //...
                    }
                });
            })(paramObj.channel, paramObj.route, i);
        }
    }


    /**
     * Remove listener
     *
     * @param paramObj {offParamObj}
     * @example
     * {
     *     channel: 'some-channel',
     *     route: 'route',
     *     scope: this
     * }
     */
    export function off ( paramObj: offParamObj ):void {

        if ( ! paramObj.hasOwnProperty('channel') )
            throw Error('A channel must be specified');

        if ( ! paramObj.hasOwnProperty('route') )
            paramObj.route = defaultRoute;

        if ( ! paramObj.hasOwnProperty('scope') )
            paramObj.scope = null;

        if ( routes.hasOwnProperty( paramObj.channel ) ) {

            //ToDo: If user passed channel name only - it should remove all routes ?

            if ( ! routes[ paramObj.channel ].hasOwnProperty( paramObj.route ) ) return;

            var i = 0, len = routes[paramObj.channel][paramObj.route].length;
            for (; i < len; i++) {
                if (routes[paramObj.channel][paramObj.route][i].caller === paramObj.scope)
                    delete routes[paramObj.channel][paramObj.route][i];
            }
        }
    }


    /**
     * Find function by it's scope in array of routs
     *
     * @param callReference - scope of the calling function
     * @param array
     * @returns {*}
     */
    function findSubscriber( callReference, array: Array<msgNerve> ) {
        if (!array)
            return null;

        var i = 0, len = array.length;
        for (; i < len; i++) {
            console.log( array[i] );
            if (array[i].caller === callReference)
                return array[i];
        }

        return null;
    }

    /**
     * Check whether given variable is function or not
     * @param functionToCheck
     * @returns {boolean}
     */
    function isFunction( functionToCheck: any ) {
        var getType = {};
        return functionToCheck && ( <any> getType.toString ).call(functionToCheck) === '[object Function]';
    }

}