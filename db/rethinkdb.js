var r = require('rethinkdb');
var connection = null;

// Setup the database connection
module.exports.setup = function() {
  r.connect({host: 'localhost', port: 28015, db: 'pledgy'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
  })
};

// Get all projects
module.exports.getAllProjects = function(callback) {
  r.table('projects').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      callback(result);
    });
  });
};

// Get all active projects
module.exports.getActiveProjects = function(callback) {
  r.table('projects').filter({archived: false}).run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      callback(result);
    });
  });
};

// Get all archived projects
module.exports.getArchivedProjects = function(callback) {
  r.table('projects').filter({archived: true}).run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        callback(result);
    })
  });
}

// Get project by ID (including pledges)
module.exports.getProjectByID = function(project_id, callback) {
  r.table('projects').get(project_id).merge(function(project) {
    return {
      pledges: r.table('pledges').getAll(project_id, {index: 'project'}).coerceTo('array')
    }
  }).run(connection, function(err, result) {
    if (err) throw err;
    callback(result);
  });
};

// Create project
module.exports.createProject = function(project, callback) {
  project.created = r.now();
  project.current = 0;
  project.funded = false;
  project.archived = false;

  r.table('projects').insert(project).run(connection, function(err, result) {
    if (err) throw err;
    callback(result.generated_keys[0]);
  });
};

// Move project to archive
module.exports.archiveProject = function(project_id, callback) {
  r.table('projects').get(project_id).update({archived: true}).run(connection, function (err) {
    if (err) throw err;
    callback();
  });
}

// Create pledge for project
module.exports.pledgeForProject = function(project_id, pledge, callback) {
  pledge.timestamp = r.now();
  pledge.project = project_id;

  // Insert new pledge object
  r.table('pledges').insert(pledge).run(connection, function(err) {
    if (err) throw err;
  });
  // Update current
  r.table('projects').get(project_id).update({
    current: r.row('current').add(pledge.amount)
  }).run(connection, function(err) {
    if (err) throw err;
  });
  callback(project_id);
}

module.exports.updateProject = function(project_id, updatedProject, callback) {
  r.table('projects').get(project_id).update(updatedProject).run(connection, function(err, result) {
    if (err) throw err;
    callback(projectID);
  });
}
