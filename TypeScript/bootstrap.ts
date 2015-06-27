/// <reference path="modules/storeApp.ts" />
/// <reference path="modules/helperModule.ts" />
/// <reference path="modules/historyModule.ts" />
/// <reference path="modules/nerveModule.ts" />

/// <reference path="modules/homePage.ts" />

// Bootstrapping main app
(function( window ){

    window.addEventListener("load", function load() {

        //remove listener, no longer needed
        window.removeEventListener("load", load, false);

        storeApp.init();
    }, false);

})( window );