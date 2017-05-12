// Inlines your CSS
module.exports = function(grunt) {

  var target = grunt.option('file') || '*.*';

  return {
    your_target: {
      options: {
        preserveMediaQueries: true,
        applyAttributesTableElements: true,
        applyWidthAttributes: true,
        preserveImportant: true,
        preserveFontFaces: true,
        webResources: {
          images: false
        }
      },
      files: [{
        expand: true,
        src: ['<%= paths.dist %>/' + target],
        dest: ''
      }]
    }
  }
};
