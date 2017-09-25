const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki.js')
const userRouter = require('./user.js')

router.use('/wiki', wikiRouter);

router.get('/', function(req, res, next) {
  res.send('Reached modular route.')
})

module.exports = router;
