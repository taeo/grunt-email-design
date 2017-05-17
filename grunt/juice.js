// Inlines your CSS
module.exports = function(grunt) {

  var files    = grunt.option('template') || '*.html',
      noinline = grunt.option('noinline') || false;

  return {
    dist: {
      options: {
        preserveMediaQueries: true,
        applyAttributesTableElements: true,
        applyWidthAttributes: true,
        applyStyleTags: !noinline,
        preserveImportant: true,
        preserveFontFaces: true,
        removeStyleTags: !noinline,
        webResources: {
          images: false
        }
      },
      files: [{
        expand: true,
        src: ['<%= paths.dist %>/' + files],
        dest: ''
      }]
    }
  }
};
