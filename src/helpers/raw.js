/*
 * Raw handlebars helper
 * Pass uncompiled mustache syntax through.
 * Usage: {{{{raw}}}} Whatever {{{{/raw}}}}
 */
module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('raw', function(options) {
      return options.fn();
    });
};
