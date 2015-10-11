var config = require('../config.json'),
    db     = require('../lib/db');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/projects');
});

router.get('/projects', function(req, res, next) {
  db.getAllProjects(function(result) {
    res.render('index', {projects: result});
  });
});

router.get('/projects/new', function(req, res, next) {
  res.render('new');
});

router.get('/project/:id', function(req, res, next) {
  db.getProjectByID(req.params.id, function(result) {
    res.render('show', {project: result});
  });
});


module.exports = router;
