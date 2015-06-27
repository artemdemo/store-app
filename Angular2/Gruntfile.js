module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            TypeScript: {
                command: 'node node_modules/typescript/bin/tsc.js -m commonjs -t es5 --emitDecoratorMetadata app.ts --sourceMap'
            }
        },
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
            scripts: {
                files: ['**/*.ts'],
                tasks: ['shell']
            },
            styles: {
                files: ['**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['shell', 'less', 'watch']);
};