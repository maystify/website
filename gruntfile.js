module.exports = function(grunt) {
  grunt.initConfig({
    sass: { // Task
      css: { // Target
        options: { // Target options
          style: 'expanded'
        },
        files: { // Dictionary of files
          'build/css/maystify.css': 'src/css/maystify.scss'
        }
      }
    },
    browserify: {
      watch: {
        options: {
          watch: true,
          keepAlive: true,
          browserifyOptions: {
            debug: true
          },
          transform: [
            ["babelify", {
              presets: ["es2015", "react"]
            }], require('strictify')
          ]
        },
        files: {
          "build/maystify.js": ["src/maystify.js"]
        }
      },
      js: {
        options: {
          browserifyOptions: {
            debug: true
          }/*,
          transform: [
            ["babelify", {
              presets: ["es2015", "react"]
            }], require('strictify')
          ]*/
        },
        files: {
          "build/maystify.js": ["src/maystify.js"]
        }
      }
    },
    copy: {
      html: {
        expand: true,
        src: ['src/*.html', 'src/server.js'],
        dest: 'build/',
        flatten: true,
        filter: 'isFile'
      }
    },
    watch: {
      css: {
        files: ['src/css/**'],
        tasks: ['sass:css']
      }
    }
  })

  // LOADING TASKS
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-watchify');
  grunt.loadNpmTasks('grunt-grunticon');

  // BUILDING THE MAIN WEB EXPERIENCE WHICH RUNS ON THE DESKTOP / IN THE BROWSER
  grunt.registerTask("build", ['sass:css', 'browserify:js', 'copy:html']);

  grunt.registerTask("watch_js",  ['browserify:watch']);
  grunt.registerTask('watch_css', ['watch:css']);
}
