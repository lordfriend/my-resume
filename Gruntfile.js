/*
 * Generated on 2014-06-22
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      less: {
        files: ['less/{,*/}*.less'],
        tasks: ['less']
      },
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    less: {
      compileMain: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'main.css.map',
          sourceMapFilename: '<%= config.dist %>/assets/css/main.css.map'
        },
        files: {
          '<%= config.dist %>/assets/css/main.css': 'less/main.less'
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    autoprefixer: {
      main: {
        src: '<%= config.dist %>/assets/css/main.css'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= config.dist %>/assets/css',
        src: [
          '*.css',
          '!*.min.css',
          '!dest.css'
        ],
        dest: '<%= config.dist %>/assets/css',
        ext: '.min.css'
      }
    },
    inline: {
      main: {
        options: {
          cssmin: true
        },
        src: ['<%= config.dist %>/index.html'],
        dest: ['<%= config.dist %>/']
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'clean',
    'less',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'less',
    'assemble',
    'autoprefixer',
    'inline'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
