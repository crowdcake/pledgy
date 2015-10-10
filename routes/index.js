var config = require('../config.json'),
    db     = require('../lib/db');

var express = require('express'),
    hashids = require('hashids');

var router = express.Router();
    project_hashids = new hashids(config.hashids_salt);

/* Overview-Page */
router.get('/', function(req, res, next) {
  db.getAllProjects(function(result) {
    res.render('index', {
          title: 'Pledgy',
          projects: result
        });

      });
    });

/* Project-Page */
router.get('/project/:project_uid', function(req, res, next) {
});

module.exports = router;
