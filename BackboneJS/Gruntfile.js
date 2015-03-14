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
        watch: {
            "styles": {
                "files": [ "less/*.less", "components/**/*.js" ],
                "tasks": ["less", "pack"],
                "options": {
                    "nospawn": true
                }
            }
        },
        concat: {
            app: {
                files: {
                    "js/app.js": [
                        "components/init.js",
                        "components/home.js"
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default',['less','pack','watch']);

    grunt.registerTask('pack',['concat:app']);
};