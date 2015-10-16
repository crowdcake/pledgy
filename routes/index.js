var db = require('../lib/db');

var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');

router.get('/', function(req, res, next) {
  res.redirect('/projects');
});

router.get('/projects', function(req, res, next) {
  db.getAllProjects(function(result) {
    res.render('index', {projects: shuffle(result)});
  });
});

router.post('/projects', function(req, res, next) {
  var newProject = {
    name: req.body.project_name,
    owner: req.body.project_owner,
    subtitle: req.body.project_subtitle,
    goal: req.body.project_goal,
    deadline: req.body.project_deadline,
    description: req.body.project_description
  }
  db.createProject(newProject, function(id) {
    res.redirect("/projects/#{id}");
  });
});

router.get('/projects/new', function(req, res, next) {
  res.render('new');
});

router.get('/project/:id', function(req, res, next) {
  console.log('project id');
  db.getProjectByID(req.params.id, function(result) {
    res.render('show', {project: result});
  });
});

router.get('/project/:id/pledge', function(req, res, next) {
  db.getProjectByID(req.params.id, function(result) {
    res.render('pledge', {project: result});
  });
});

router.get('/archive', function(req, res, next) {
  db.getFundedProjects(function(result) {
    res.render('archive', {projects: result});
  });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
