module.exports = function(grunt) {

  grunt.initConfig({
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.html'],
          dest: 'dist/'
        }]
      }
    },
    uglify: {
      dist: {
        options: {
          screwIE8: true
        },
        files: [{
          expand: true,    // allow dynamic building
          cwd: 'src/js/',
          src: ['**/*.js'],  // source files mask
          dest: 'dist/js/',    // destination folder
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css/',
          src: ['**/*.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },
    imagemin: {
     dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
           expand: true,
           cwd: 'src/',
           src: ['**/*.{png,jpg,gif}'],
           dest: 'dist/'
        }]
      }
    },
    watch: {
      files: ['src/**/*.*'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['htmlmin', 'uglify', 'cssmin', 'imagemin']);
};
