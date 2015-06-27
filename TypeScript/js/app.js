var storeApp;
(function (storeApp) {
    var mainContainer;
    /**
     * Initialization of storeApp
     */
    function init() {
        storeApp.history.init();
        mainContainer = document.getElementById('mainContainer');
        storeApp.homePage.show();
    }
    storeApp.init = init;
    /**
     * Return main container element
     * @returns {HTMLDivElement}
     */
    function getMainContainer() { return mainContainer; }
    storeApp.getMainContainer = getMainContainer;
})(storeApp || (storeApp = {}));
var hashApp;
(function (hashApp) {
    var helper;
    (function (helper) {
        /**
         * Check whether el has given class or hasn't
         * @param className
         * @param el
         * @returns {boolean}
         */
        function hasClass(className, el) {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }
        helper.hasClass = hasClass;
        /**
         * Add class to the element
         * Notice, function is not checking whether given className exists on element or not
         * @param className
         * @param el
         * @returns {HTMLBaseElement}
         */
        function addClass(className, el) {
            el.className = el.className.trim() + ' ' + className;
            return el;
        }
        helper.addClass = addClass;
        /**
         * Remove class from the element
         * @param className
         * @param el
         * @returns {HTMLBaseElement}
         */
        function removeClass(className, el) {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), '');
            return el;
        }
        helper.removeClass = removeClass;
        /**
         * Toggle class name
         * @param className
         * @param el
         * @param callback
         * @returns {HTMLBaseElement}
         */
        function toggleClass(className, el, callback) {
            if (helper.hasClass(className, el)) {
                helper.removeClass(className, el);
                if (isFunction(callback))
                    callback({ tAction: 'removed' });
            }
            else {
                helper.addClass(className, el);
                if (isFunction(callback))
                    callback({ tAction: 'added' });
            }
            return el;
        }
        helper.toggleClass = toggleClass;
        /**
         * Check whether given variable is function or not
         * @param functionToCheck
         * @returns {boolean}
         */
        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }
        helper.isFunction = isFunction;
        /**
         * Create array with unique values from given one
         * @param arr
         * @returns {Array}
         */
        function arrUnique(arr) {
            var a = [];
            for (var i = 0; i < arr.length; i++) {
                var current = arr[i];
                if (a.indexOf(current) < 0)
                    a.push(current);
            }
            return a;
        }
        helper.arrUnique = arrUnique;
        /**
         * Search for a specified value within an array
         * @param value
         * @param arr {Array}
         * @return {boolean}
         */
        function inArray(value, arr) {
            // Notice that following will work only in IE9 and above
            return arr.indexOf(value) > -1;
        }
        helper.inArray = inArray;
        /**
         *
         * @param email
         * @returns {boolean}
         */
        function isValidEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }
        helper.isValidEmail = isValidEmail;
        /**
         * Set cookie
         * @param name
         * @param value
         * @param expire_days
         */
        function setCookie(name, value, expire_days) {
            var d = new Date();
            d.setTime(d.getTime() + (expire_days * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires;
        }
        helper.setCookie = setCookie;
        /**
         * Return cookie
         * @param name
         * @returns {string || boolean}
         */
        function getCookie(name) {
            var _name = name + "=";
            var ca = document.cookie.split(';');
            var result = false;
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1);
                if (c.indexOf(_name) == 0)
                    result = c.substring(_name.length, c.length);
            }
            return result;
        }
        helper.getCookie = getCookie;
    })(helper = hashApp.helper || (hashApp.helper = {}));
})(hashApp || (hashApp = {}));
var storeApp;
(function (storeApp) {
    var history;
    (function (history) {
        var historyArr = [];
        var currentState = null;
        function init() {
            // Handle clicking on browsers forward and back buttons
            window.addEventListener('popstate', function (e) {
                if (!!e.state && e.state.hasOwnProperty('uID')) {
                    storeApp.nerve.send({
                        channel: 'history',
                        context: { id: e.state.id }
                    });
                }
            }, false);
        }
        history.init = init;
        /**
         * Save state to the browser history
         */
        function saveState(stateID) {
            var state = {
                uID: String(+new Date()) + String(Math.floor((Math.random() * 1000) + 1)),
                id: stateID,
                title: 'page ' + stateID,
                url: window.location.pathname + window.location.search + '#' + stateID
            };
            window.history.pushState({ id: state.id, uID: state.uID }, state.title, state.url);
            historyArr.push(state);
            currentState = state;
        }
        history.saveState = saveState;
    })(history = storeApp.history || (storeApp.history = {}));
})(storeApp || (storeApp = {}));
/**
 * Nerve is lightweight javascript library for asynchronous broadcasts along routes and channels.
 * @source https://github.com/artemdemo/nerve
 * (original) https://github.com/jstandish/nerve
 */
var storeApp;
(function (storeApp) {
    var nerve;
    (function (nerve) {
        var routes = {};
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
        function on(paramObj) {
            var caller = null;
            if (!paramObj.hasOwnProperty('channel') ||
                !paramObj.hasOwnProperty('callback') ||
                !isFunction(paramObj.callback))
                throw Error('A channel and a callback must be specified');
            if (!paramObj.hasOwnProperty('scope'))
                caller = null;
            else
                caller = paramObj.scope || null;
            // Create new route if there is no one
            if (!routes.hasOwnProperty(paramObj.channel))
                routes[paramObj.channel] = {};
            // If there is no route in paramObj - will create default one
            if (!paramObj.hasOwnProperty('route'))
                paramObj.route = defaultRoute;
            // If given paramObj.route not exists in main routes object - create one
            if (!routes[paramObj.channel].hasOwnProperty(paramObj.route))
                routes[paramObj.channel][paramObj.route] = [];
            // Check to make sure we aren't adding ourselves twice
            if (findSubscriber(caller, routes[paramObj.channel][paramObj.route]))
                return;
            routes[paramObj.channel][paramObj.route].push({
                caller: caller,
                callback: paramObj.callback
            });
        }
        nerve.on = on;
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
        function send(paramObj) {
            if (!paramObj.hasOwnProperty('channel'))
                throw Error('A channel must be specified');
            if (!paramObj.hasOwnProperty('route'))
                paramObj.route = defaultRoute;
            if (!routes.hasOwnProperty(paramObj.channel) || !routes[paramObj.channel].hasOwnProperty(paramObj.route)) {
                return;
            }
            if (!paramObj.hasOwnProperty('context'))
                paramObj.context = null;
            var listeners = routes[paramObj.channel][paramObj.route], i = 0, len = listeners.length;
            for (; i < len; i++) {
                (function (ch, rt, idx) {
                    var ref = setTimeout(function () {
                        try {
                            routes[ch][rt][idx].callback.call(routes[ch][rt][idx].caller, paramObj.context);
                            clearTimeout(ref);
                        }
                        catch (e) {
                        }
                    });
                })(paramObj.channel, paramObj.route, i);
            }
        }
        nerve.send = send;
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
        function off(paramObj) {
            if (!paramObj.hasOwnProperty('channel'))
                throw Error('A channel must be specified');
            if (!paramObj.hasOwnProperty('route'))
                paramObj.route = defaultRoute;
            if (!paramObj.hasOwnProperty('scope'))
                paramObj.scope = null;
            if (routes.hasOwnProperty(paramObj.channel)) {
                //ToDo: If user passed channel name only - it should remove all routes ?
                if (!routes[paramObj.channel].hasOwnProperty(paramObj.route))
                    return;
                var i = 0, len = routes[paramObj.channel][paramObj.route].length;
                for (; i < len; i++) {
                    if (routes[paramObj.channel][paramObj.route][i].caller === paramObj.scope)
                        delete routes[paramObj.channel][paramObj.route][i];
                }
            }
        }
        nerve.off = off;
        /**
         * Find function by it's scope in array of routs
         *
         * @param callReference - scope of the calling function
         * @param array
         * @returns {*}
         */
        function findSubscriber(callReference, array) {
            if (!array)
                return null;
            var i = 0, len = array.length;
            for (; i < len; i++) {
                console.log(array[i]);
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
        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }
    })(nerve = storeApp.nerve || (storeApp.nerve = {}));
})(storeApp || (storeApp = {}));
var storeApp;
(function (storeApp) {
    var homePage;
    (function (homePage) {
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
        function show() {
            var $mainContainer = storeApp.getMainContainer();
            $mainContainer.innerHTML = homeHTML;
            $mainContainer.getElementsByTagName('button')[0]
                .addEventListener('click', function (e) {
                console.log('Open store');
            });
        }
        homePage.show = show;
    })(homePage = storeApp.homePage || (storeApp.homePage = {}));
})(storeApp || (storeApp = {}));
/// <reference path="modules/storeApp.ts" />
/// <reference path="modules/helperModule.ts" />
/// <reference path="modules/historyModule.ts" />
/// <reference path="modules/nerveModule.ts" />
/// <reference path="modules/homePage.ts" />
// Bootstrapping main app
(function (window) {
    window.addEventListener("load", function load() {
        //remove listener, no longer needed
        window.removeEventListener("load", load, false);
        storeApp.init();
    }, false);
})(window);
//# sourceMappingURL=app.js.map