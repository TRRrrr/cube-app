module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      directive: {
        src: ['src/js/directive_header.js', 'src/js/directive/*.js', 'src/js/directive_footer.js'],
        dest: 'src/dist/js/<%= pkg.name %>-directive.js'
      },
      app: {
        src: [
          'src/js/app_header.js',
          'src/js/config.js',
          'src/js/main.js',
          'src/js/app.js',
          'src/js/stats.js',
          'src/js/app_footer.js',
        ],
        dest: 'src/dist/js/<%= pkg.name %>.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'src',
          keepalive: true
        }
      }
    },
    watch: {
      src: {
        files: ['src/js/**/*.js'],
        tasks: ['concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
