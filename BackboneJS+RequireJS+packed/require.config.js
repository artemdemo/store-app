(function() {
    'use strict';

    var requireConfigFactory = function() {
        return {
            baseUrl: './source',
            deps: ['init'],
            paths: {
                backbone: '../node_modules/backbone/backbone-min',
                underscore: '../node_modules/underscore/underscore-min',
                jquery: '../node_modules/jquery/dist/jquery.min',
                text: '../node_modules/requirejs-text/text'
            },
            optimize: 'none',
            generateSourceMaps: true,
            include: [
                '../node_modules/requirejs/require'
            ],
            shim: {
                underscore: {
                    exports: '_'
                },
                backbone: {
                    deps: ['underscore', 'jquery'],
                    exports: 'Backbone'
                }
            }
        };
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = requireConfigFactory;
    }

    if (typeof window !== 'undefined' && typeof require !== 'undefined' && require.config) {
        var configOptions = {
            'base': window.HH_STATIC_URI,
            'unpackedTemplates': window.HH_UNPACKED_TPL
        };
        require.config(requireConfigFactory(configOptions));
    }
})();
