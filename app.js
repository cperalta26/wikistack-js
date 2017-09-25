const express = require('express');
const wikiApp = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const nunjucks = require('nunjucks');
const path = require('path');

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
wikiApp.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
wikiApp.engine('html', nunjucks.render);

//using morgan to log status
wikiApp.use(morgan('dev'));
wikiApp.use(express.static(path.join(__dirname, '/public')));
wikiApp.use('/',routes);

wikiApp.listen(3000, function() {
  console.log("Listening on port");
})
