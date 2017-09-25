const express = require('express');
const router = express.Router();
const models = require('../models');

const Page = models.Page;
const User = models.User;

router.post('/', function(req, res, next) {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
    //could use req.body instead of the above
  });

  var user = User.build ({
      name: req.body.name,
      email: req.body.email
  });
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  user.save()

  page.save().then(function(savedPage){
    res.redirect(savedPage.urlTitle); // route virtual FTW
    //res.json(savedPage);
  }).catch(next);

});


router.get('/', function(req, res, next) {
  Page.findAll({})
    .then(function(thePages){
      //thePages.forEach(eachPage=>{res.json(eachPage.title)})
      //res.json(thePages)
      // res.render('index', {pages: thePages})
      thePages.forEach(eachPage=>{res.render('index', {pages: eachPage.title})})
    })
  //res.render('index', {pages: Page.findAll({})})
});

// router.post('/', function(req, res, next) {
//   console.log("post ", req.body)
//   res.send('got to POST /wiki/');
// });

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

    Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function(foundPage){
       //res.json(foundPage);
      if(foundPage===null) {
        return next(new Error("This page was not found"))
      }
      res.render('wikipage', {urlTitle: req.params.urlTitle, content: foundPage.content});

      // could also do the above this way:

      // res.render('wikipage',  page: foundPage)
    })
    .catch(next);

  });

module.exports = router;
