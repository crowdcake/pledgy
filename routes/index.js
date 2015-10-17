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
    goal: parseInt(req.body.project_goal) * 100,
    // deadline: Date.parse(req.body.project_deadline),
    description: req.body.project_description
  }
  db.createProject(newProject, function(id) {
    res.redirect("/project/" + id);
  });
});

router.get('/projects/new', function(req, res, next) {
  res.render('new');
});

router.get('/project/:id', function(req, res, next) {
  db.getProjectByID(req.params.id, function(result) {
    if(result) {
      res.render('show', {project: result});
    } else {
      res.status(404).render('notfound');
    }
  });
});

router.get('/project/:id/pledge', function(req, res, next) {
  db.getProjectByID(req.params.id, function(result) {
    res.render('pledge', {project: result});
  });
});

router.post('/project/:id/pledge', function(req, res, next) {
  var pledge = {
    user: req.body.pledge_user,
    amount: (req.body.pledge_amount * 100),
    public: ((req.body.pledge_public == 'on') ? true : false)
  }
  db.pledgeForProject(req.params.id, pledge);
  res.redirect("/project/" + req.params.id);
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
