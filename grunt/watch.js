// Watches for changes to CSS or email templates then runs grunt tasks
module.exports = function(grunt) {

  var files = grunt.option('template') || '*.hbs',
      distFiles = grunt.option('template') || '*.html';

  return {
    pieces: {
      files: ['<%= paths.src %>/layouts/*','<%= paths.src %>/partials/**/*','<%= paths.src %>/data/*'],
      tasks: ['default']
    },
    styles: {
      files: ['<%= paths.src %>/css/scss/*'],
      tasks: ['sass:dist', 'templates']
    },
    emails: {
      files: ['<%= paths.src %>/emails/' + files],
      tasks: ['templates']
    },
    dist: {
      files: ['./dist/' + distFiles],
      tasks: [],
      options: {
        livereload: true
      }
    },
    preview: {
      files: ['<%= paths.preview %>/scss/*'],
      tasks: ['sass:preview','autoprefixer:preview'],
      options: {
        livereload: true
      }
    }
  }
};
