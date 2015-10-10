var config = require('../config.json'),
    db     = require('../lib/db');

var express = require('express'),
    hashids = require('hashids');

var router = express.Router();
    project_hashids = new hashids(config.hashids_salt);

router.get('/', function(req, res, next) {
  res.status(200).redirect('/project');
});

/* Overview-Page */
router.get('/project', function(req, res, next) {
  db.getAllProjects(function(result) {
    res.render('index', {
      title: 'Pledgy',
      projects: result
    });

  });
});

/* Project-Page */
router.get('/project/:id', function(req, res, next) {
  db.getProjectByID(req.params.id, function(result) {
    res.render('project', {
      title: 'Pledgy',
      project: result
    });
  });
});

module.exports = router;
