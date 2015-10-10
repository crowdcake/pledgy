var config = require('../config.json');

var express = require('express'),
    hashids = require('hashids');

var router = express.Router();
    project_hashids = new hashids(config.hashids_salt);

/* Overview-Page */
router.get('/', function(req, res, next) {
    var projects = [{
        title: "Pledgy",
        desc: "Pure awesomeness."
    }];
    res.render('index', {
        title: 'Pledgy',
        projects: projects
    });
});

/* Project-Page */
router.get('/project/:project_uid', function(req, res, next) {
});

module.exports = router;
