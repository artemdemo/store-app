/*global module, require*/
module.exports = function(grunt) {

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
            combined_file_output: {
            files: {
                'js/app.js': [
                    'components/vendor/EventEmitter.min.js',
                    'components/home/home.jsx',
                    'components/store/MenuService.jsx',
                    'components/store/StoreService.jsx',
                    'components/store/store-bootstrap.jsx',
                    'components/store/shelf.jsx',
                    'components/store/cart.jsx'
                ]
            }
          }
        },
        watch: {
            "styles": {
                "files": [ "less/*.less" ],
                "tasks": ["less"],
                "options": {
                    "nospawn": true
                }
            },
            "scripts": {
                "files": [ "components/**/*.jsx" ],
                "tasks": ["react"],
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