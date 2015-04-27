'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        // BUILD SASS TO CSS
        sass: {
            dev: {
                options: {
                    // We used the expanded style because Webhook already minifies CSS when it deploys your site.
                    // Uncomment the "sourcemap" line when pushing to production if including crp.html to improve pagespeed. Otherwise, the browser will throw an error for a missing crap.html.map file
                    // sourcemap: 'none',
                    style: 'expanded'
                    // Uncomment the below line to include outside directories as well.
                    // loadPath: ['location/of/other/sass']
                },
                files: [{
                    // Files in the /sass/ directory will go to /static/css/ when processed.
                    expand: true,
                    cwd: 'sass',
                    src: ['main.scss'],
                    dest: 'static/css',
                    ext: '.css'
                }, { // Files to override the Markdown Preview in the CMS
                    //Goes to an override file of the same name
                    expand: true,
                    cwd: 'sass',
                    src: ['cms_override.scss'],
                    dest: 'static/css',
                    ext: '.css'
                }
                // ,{ Can be used to create a crp.html file for inlining above-fold style for mobile
                //     expand: true,
                //     cwd: 'sass',
                //     src: ['crp.scss'],
                //     dest: 'templates/partials',
                //     ext: '.html'
                // }
                ]
            }
        },
        //Use babel.js for ES6 Transpilation
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "static/javascript/main.js": "static/javascript/babel.js"
                }
            }
        },
        // WHEN FILES CHANGE, RUN THE ABOVE TASKS ALONG WITH BUILD
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'build']
            },
            babel: {
                files: ['static/javascript/babel.js'],
                tasks: ['babel', 'build']
            }
        }
    });
    grunt.registerTask("default", ["babel"]);
    // THIS LOADS THE TASKS WE NEED ABOVE IN FROM OUR NPM
    // Note, that we need to have these installed through the package.json file as well
    grunt.loadNpmTasks('grunt-contrib-sass');
    // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
    require('./options/generatorOptions.js')(grunt);
    grunt.loadTasks('tasks');
};
