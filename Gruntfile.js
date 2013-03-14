
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! \n* <%= pkg.title || pkg.name %> - v<%= pkg.version %>' +
            '\n* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> ' +
            '\n* <%= pkg.homepage ? pkg.homepage : "" %> ' +
            '\n*/ \n\n',

    paths: {
      app: {
        root: "app/",
        css: "app/styles/",
        assets: "app/assets/",
        templates: "app/views/templates/"
      },
      vendor: {
        css: "vendor/css/",
        js: "vendor/scripts/",
        images: "vendor/img/",
      },
      dist: {
        root: "dist/",
        css: "dist/css/",
        js: "dist/js/",
        images: "dist/img"
      },
      mockups: {
        root: "mockups/",
      }
    },

    clean: {
      before: {
        src: [
          "<%= paths.app.root %>views/templates/**/*.js", 
          "<%= paths.dist.root %>*",
          "!<%= paths.dist.root %>.gitignore"
        ],
      },
      after: {
        src: [
          "<%= paths.app.root %>views/templates/**/*.js", 
          "<%= paths.dist.root %>app_prev.js"
        ]
      } 
    },

    less: {
      dev: {
        options: {
          compress: false
        },
        files: {
          "<%= paths.dist.css %>app.css": [
            "<%= paths.vendor.css %>*",
            "<%= paths.app.css %>base.less"
          ]
        }
      }
    },

    handlebars: {
      dev: {
        files: grunt.file.expandMapping(['app/views/templates/**/*.hbs'], 'app/views/templates/', {
          rename: function(destBase, destPath) {
            return destBase + destPath.split('app/views/templates/')[1].replace(/\.hbs$/, '.js');
          }
        })
      }
    },

    builder: {
      dev: {
        src: "<%= paths.app.root %>initDev.js",
        dest: "<%= paths.dist.root %>app_prev.js"
      },
      prod: {
        src: "<%= paths.app.root %>initProd.js",
        dest: "<%= paths.dist.root %>app_prev.js"
      }
    },

    concat: {
      vendor: {
        src: [
            '<%= paths.vendor.js %>console-helper.js'
          , '<%= paths.vendor.js %>underscore.min.js'
          , '<%= paths.vendor.js %>backbone.min.js'
          , '<%= paths.vendor.js %>backbone.marionette.min.js'
          , '<%= paths.vendor.js %>bootstrap.min.js'
          , '<%= paths.vendor.js %>**/*.js'
         ],
        dest: '<%= paths.dist.js %>vendor.js'
      },
      app: {
        options: {
          stripBanners: {
            line: true
          },
          banner: '<%= banner %>',
        },
        src: [ '<%= paths.dist.root %>app_prev.js' ],
        dest: '<%= paths.dist.js %>app.js'
      }
    },

    uglify: {
      app: {
        options: {
          stripBanners: {
            line: true
          },
          banner: '<%= banner %>',
        },
        files: {
          '<%= paths.dist.js %>app.js': [ '<%= paths.dist.js %>app.js' ]
        }
      }
    },

    copy: {
      dist: {
        expand: true, 
        cwd: "<%= paths.app.assets %>", 
        src: ["**"], 
        dest: "<%= paths.dist.root %>"
      },
      vendor: {
        expand: true, 
        cwd: "<%= paths.vendor.images %>", 
        src: ["**"], 
        dest: "<%= paths.dist.images %>"
      },
      mockups: {
        src: "<%= paths.dist.root %>**/*",
        dest: "<%= paths.mockups.root %>"
      }
    },

    watch: {
      scripts: {
        files: "<%= paths.app.root %>**/*",
        tasks: ['default']
      }
    },

    jshint: {
      all: {
        files: {
          src: ["<%= paths.app.root %>**/*.js"]
        },
        options: {
          bitwise: true
          ,curly: true
          ,eqeqeq: true
          ,forin: true
          ,immed: true
          ,latedef: true
          ,newcap: true
          ,noempty: true
          ,nonew: true
          ,quotmark: false
          ,undef: true
          ,unused: true
          ,laxcomma: true

          ,globals: {
            window: true
            ,jQuery: true
            ,$: true
            ,_: true
            ,require: true
            ,module: true
            ,Backbone: true
            ,Handlebars: true
            ,console: true
            ,io: true
            ,logger: true
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-commonjs-handlebars');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  require('./builder.grunt.js')(grunt);

  grunt.registerTask("default", [
    "clean:before", 
    "jshint:all", 
    "less:dev",
    "handlebars", 
    "builder:dev", 
    "concat", 
    "clean:after",
    "copy"
  ]);

  grunt.registerTask("stage", [
    "clean:before", 
    "jshint:all", 
    "less:dev",
    "handlebars", 
    "builder:prod", 
    "concat", 
    "clean:after",
    "copy"
  ]);

  grunt.registerTask("prod", [
    "clean:before", 
    "jshint:all", 
    "less:dev",
    "handlebars", 
    "builder:prod", 
    "concat", 
    "uglify",
    "clean:after",
    "copy"
  ]);

  grunt.registerTask("w", ["default", "watch"]);
};
