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
    content: req.body
  });
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  // then(function(){
  res.redirect('/');
  // })
});


router.get('/', function(req, res, next) {
  res.redirect('/');
  // res.send('got to GET /wiki/');
});

// router.post('/', function(req, res, next) {
//   console.log("post ", req.body)
//   res.send('got to POST /wiki/');
// });

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

module.exports = router;
