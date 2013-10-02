module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      directive: {
        src: ['src/js/directive_header.js', 'src/js/directive/*.js', 'src/js/directive_footer.js'],
        dest: 'src/dist/js/directive.js'
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
        dest: 'src/dist/js/app.js'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
};
