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

module.exports.getProjectByID = function(project_id, callback) {
  r.table('projects').get(project_id).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  });
};

module.exports.createProject = function(project, callback) {
};