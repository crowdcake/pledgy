var config = require('../config/config.json');
var mongoose = require('mongoose');

var Project = require('./mongoose_models/projects');

function renameIDFieldArr (projectArr) {
  var newProjects = [];
  projectArr.forEach(function(project) {
    newProjects.push(renameIDField(project));
  });
  return newProjects;
}

function renameIDField (project) {
  project = project.toObject();
  project['id'] = project['_id'].toString();
  delete project['_id'];
  return project;
}

module.exports.setup = function() {
  mongoose.connect("mongodb://" + config.database.host + "/pledgy");
}

// Get all projects
module.exports.getAllProjects = function(callback) {
  Project.find({}, function(err, projects) {
    if (err) throw err;
    callback(renameIDFieldArr(projects));
  });
};

// Get all active projects
module.exports.getActiveProjects = function(callback) {
  Project.find({archived: false}, function(err, projects) {
    if (err) throw err;
    callback(renameIDFieldArr(projects));
  });
};

// Get all archived projects
module.exports.getArchivedProjects = function(callback) {
  Project.find({archived: true}, function(err, projects) {
    if (err) throw err;
    callback(renameIDFieldArr(projects));
  });
}

// Get project by ID
module.exports.getProjectByID = function(project_id, callback) {
  Project.findOne({ '_id': project_id }, function (err, project) {
    if (err || project == undefined) callback(undefined);
    else callback(renameIDField(project));
  });
};

// Create project
module.exports.createProject = function(project_vals, callback) {
  var project = new Project();

  project.name = project_vals.name;
  project.owner = project_vals.owner;
  project.subtitle = project_vals.subtitle;
  project.goal = project_vals.goal;
  project.description = project_vals.description;

  project.created = Date.now();
  project.current = 0;
  project.funded = false;
  project.archived = false;
  project.pledges = [];

  project.save(function(err, project) {
    if (err) throw err;
    callback(project._id);
  });
};

// Move project to archive
module.exports.archiveProject = function(project_id, callback) {
  Project.findOne({_id: project_id}, function (err, project) {
    if (err) throw err;
    project.archived = true;
    project.save(function (err, project) {
      if (err) throw err;
      callback();
    });
  });
}

// Create pledge for project
module.exports.pledgeForProject = function(project_id, pledge, callback) {
  pledge.timestamp = Date.now();
  // Insert new pledge object
  Project.findOne({_id: project_id}, function(err, project) {
    project.pledges.push(pledge);
    project.current += pledge.amount;
    project.save(function (err, project) {
      if (err) throw err;
      callback(project_id);
    })
  });
};
