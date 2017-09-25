const express = require('express');
const wikiApp = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require('./models/index.js');

wikiApp.use(bodyParser.urlencoded({extended: true}));
wikiApp.use(bodyParser.json());

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
//The above code refers to folder 'views'
// have res.render work with html files
wikiApp.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
wikiApp.engine('html', nunjucks.render);

//using morgan to log status
wikiApp.use(morgan('dev'));
wikiApp.use(express.static(path.join(__dirname, '/public')));
wikiApp.use('/',routes);

// models.db.sync({force: true});

models.User.sync({force:true}).then(function() {
    return models.Page.sync({})
})
.then (function () {
    wikiApp.listen(3000, function() {
      console.log("Listening on port 3000");
    });
})
.catch(console.error);

