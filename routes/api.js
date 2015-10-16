var db = require('../lib/db');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('<p>api: coming soon.</p>');
});

module.exports = router;
