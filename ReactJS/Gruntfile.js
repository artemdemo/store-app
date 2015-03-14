/*global module, require*/
module.exports = function(grunt) {

    var path = require('path');

    var infoBanner = '/**!\n' +
					 ' * <%= pkg.name %> \n' +
					 ' * @version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					 ' */\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            "development": {
                "options": {
                    "compress": false,
                    "optimization": 2
                },
                "files": {
                    "css/style.css": "less/style.less"
                }
            }
        },
        react: {
          dynamic_mappings: {
            files: [
              {
                expand: true,
                cwd: 'components',
                src: ['**/*.jsx'],
                dest: 'js',
                ext: '.js'
              }
            ]
          }
        },
        watch: {
            "styles": {
                "files": [ "less/*.less", "components/*.jsx" ],
                "tasks": ["less", "react"],
                "options": {
                    "nospawn": true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default',['less', 'react', 'watch']);
};