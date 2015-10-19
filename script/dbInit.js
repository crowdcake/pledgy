var config = require('../config/config.json');
var r = require('rethinkdb');

var connection = null;
var args = process.argv.slice(2);

r.connect({host: config.database.host, port: config.database.port, db: config.database.db}).then(function(conn) {
  connection = conn;
  console.log("[dbInit] connected");
  return r.dbList().run(connection);
})
.then(function(dbs) {
  if (dbs.indexOf(config.database.db) == -1) {
    return r.dbCreate(config.database.db).run(connection);
  } else {
    console.log("[dbInit] database exists already");
  }
})
.then(function() {
  return r.db(config.database.db).tableList().run(connection);
})
.then(function(tables) {
  if (tables.indexOf('projects') == -1) {
    return r.db(config.database.db).tableCreate('projects').run(connection);
  } else {
    console.log("[dbInit] table exists already")
    if (args[0] == "-f") {
      console.log("[dbInit] wiping table");
      return r.db(config.database.db).table('projects').delete().run(connection);
    }
  }
})
.then(function() {
  console.log("[dbInit] done.");
})
.error(function(err) {
  console.log(err);
})
.finally(function() {
  if (connection) {
    connection.close();
  }
});
