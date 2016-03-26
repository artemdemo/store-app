/*global module, require*/

var requireConfig = require('./require.config.js');
var _ = require('underscore');

module.exports = function(grunt) {

    var path = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    compress: false,
                    optimization: 2
                },
                files: {
                    'css/style.css': 'less/style.less'
                }
            }
        },
        requirejs: {
            compile: {
                options: _.extend(requireConfig(), {
                    out: 'js/app.packed.js'
                })
            }
        },
        uglify: {
            compile: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapIn: './js/app.packed.js.map',
                    preserveComments: function(node, comment) {
                        return comment.value[0] == '!' || comment.value.indexOf('@license') > -1
                    }
                },
                files: [{
                    src: './js/app.packed.js',
                    dest: './js/app.packed.min.js'
                }]
            }
        },
        watch: {
            styles: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['source/**/*.js'],
                tasks: ['requirejs', 'uglify'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',['less','requirejs', 'uglify', 'watch']);

};