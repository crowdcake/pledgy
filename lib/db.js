var r = require('rethinkdb');

var connection = null;

module.exports.setup = function() {
  r.connect({host: 'localhost', port: 28015, db: 'pledgy'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
  })
};

module.exports.getAllProjects = function(callback) {
  r.table('projects').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      callback(result);
    });
  });
};

module.exports.getActiveProjects = function(callback) {
  r.table('projects').filter({archived: false}).run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      callback(result);
    });
  });
};

module.exports.getProjectByID = function(project_id, callback) {
  r.table('projects').get(project_id).run(connection, function(err, result) {
    if (err) throw err;
    callback(result);
  });
};

module.exports.createProject = function(project, callback) {
  project.created = r.now();
  project.current = 0;
  project.funded = false;
  project.archived = false;
  project.pledges = [];

  r.table('projects').insert(project).run(connection, function(err, result) {
    if (err) throw err;
    callback(result.generated_keys[0]);
  });
};

module.exports.getFundedProjects = function(callback) {
  r.table('projects').filter({funded: true}).run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      callback(result);
    });
  });
};

module.exports.archiveProject = function(project_id, callback) {
    r.table('projects').get(project_id).update({archived: true}).run(connection, function (err) {
        if (err) throw err;
        callback();
    });
}

module.exports.getArchivedProjects = function(callback) {
  r.table('projects').filter({archived: true}).run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        callback(result);
    })
  });
}

module.exports.pledgeForProject = function(project_id, pledge) {
  console.log(pledge);
  pledge.timestamp = r.now();
  // Insert new pledge object
  r.table('projects').get(project_id).update({
    pledges: r.row('pledges').append(pledge)
  }).run(connection, function(err) {
    if (err) throw err;
  });
  // Update current
  r.table('projects').get(project_id).update({
    current: r.row('current').add(pledge.amount)
  }).run(connection, function(err) {
    if (err) throw err;
  });
};
