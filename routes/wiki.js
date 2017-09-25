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
  });

  var user = User.build ({
      name: req.body.name,
      email: req.body.email
  });
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  user.save()
  page.save()

  .then(function() {res.json(req.body) })
  .catch(function(error)  {
    console.log("error found ", error)
  });
  // then(function(){

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

router.get('/:urlTitle', function (req, res, next) {

    Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function(foundPage){
       //res.json(foundPage);
      res.render('wikipage', {urlTitle: req.params.urlTitle, content: foundPage.content});
    })
    .catch(next);

  });

module.exports = router;
