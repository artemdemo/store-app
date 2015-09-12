requirejs.config({
    baseUrl: './js',
    deps: ['init'],
    paths: {
        backbone: '../node_modules/backbone/backbone-min',
        underscore: '../node_modules/backbone/node_modules/underscore/underscore-min',
        jquery: '../node_modules/jquery/dist/jquery.min',
        text: '../node_modules/requirejs-text/text'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});