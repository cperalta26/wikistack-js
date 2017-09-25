const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Reached modular route.')
})

module.exports = router;
