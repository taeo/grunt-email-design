var express = require('express'),
    engines = require('consolidate'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    app = express();

var currentTemplate = null;

var phpExpress = require('php-express')({
  // assumes php is in your PATH
  binPath: 'php'
});

// Apply supported rendering engines
app.engine('ejs', engines.ejs);
app.engine('hbs', engines.handlebars);
app.engine('html', require('ejs').renderFile);
app.engine('liquid', engines.liquid);
app.engine('php', phpExpress.engine);

// Set default rending engine to html
app.set('view engine', 'html');

// Allow relative image links from either ./dist/img or ./src/img
app.use("/src/img", express.static(__dirname + "/src/img"));
app.use("/dist/img", express.static(__dirname + "/dist/img"));

// Allow sample data
app.use("/preview/data", express.static(__dirname + "/preview/data"));

// Set the route handler for the preview page.
app.get('/',function(req,res){

  res.status(200);

  var data = {
      templates: getTemplates()
  };

  res.render(__dirname + '/preview/index.ejs', data);

});

app.get('/frame',function(req,res){

  res.status(200);

  var currentTemplate = req.query.template;

  // Get data for the template
  // TODO: php-express only passes "get: {} or post: {} data"
  // There's no direct variable access within the template.
  data = getTemplateData(currentTemplate);

  // Send the rendered response along with any sample data.
  res.render(__dirname + '/dist/' + currentTemplate, data);

});

module.exports = app;

function getTemplateData(currentTemplate) {
  var basename = currentTemplate.split('.')[0];

  console.log('filebasename for date template', basename);

  // Check for YAML sample data
  var data = {};
  try {
      data = fs.readFileSync(__dirname + '/preview/data/' + basename + '.yaml', 'utf8');
      return yaml.safeLoad(data);
  } catch (e) {
      // console.log(e);
  }

  // Check for JSON sample data
  try {
      data = fs.readFileSync(__dirname + '/preview/data/' + basename + '.json', 'utf8');
      return JSON.parse(data);
  } catch (e) {
      // console.log(e);
  }

  return {};
}

// Helper function to get templates and their "subject" from <title> tag
function getTemplates() {
    var templates = [],
        templateDir = __dirname + '/dist/',
        templateFiles = fs.readdirSync(templateDir);

    templateFiles.forEach( function (file) {
        var extension = getExtension(file);

        // TODO: Check against supported file extensions
        // within the prview rendering engines
        if (extension) {
          var contents = fs.readFileSync(templateDir + file, 'utf8');

          if (contents) {
            $ = cheerio.load(contents);

            templates.push({
              'filename': file,
              'subject': $("html title").text() || "Subject not available"
            });
          }
        } else {
          console.log('Unsupported file extension found', file, extension);
        }
    });

    return templates;
}

function getExtension(filename) {
  if (filename.indexOf('.') === -1) {
    return false;
  }
  return filename.split('.').pop();
}
