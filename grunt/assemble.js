// Assembles your email content with HTML layout
module.exports = function(grunt) {

  var file = grunt.option('file');
  var target = (file) ? file + '.hbs' : '*.hbs';

  return {
    options: {
      layoutdir: '<%= paths.src %>/layouts',
      partials: ['<%= paths.src %>/partials/**/*.hbs'],
      helpers: ['<%= paths.src %>/helpers/**/*.js'],
      data: ['<%= paths.src %>/data/*.{json,yml}'],
      flatten: true,
      ext: '',
    },
    pages: {
      src: ['<%= paths.src %>/emails/' + target],
      dest: '<%= paths.dist %>/'
    }
  }
};
