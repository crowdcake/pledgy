var r = require('rethinkdb');

var connection = null;

r.connect().then(function(conn) {
  connection = conn;
  return r.db('pledgy').tableDrop('projects').run(connection);
})
.then(function() {
  return r.db('pledgy').tableCreate('projects').run(connection);
})
.then(function() {
  return r.db('pledgy').table('projects').insert([
      { archived: false,
        archive_reason: null,
        current: 0,
        description: "Sample description",
        goal: 1337,
        name: "Nuclear power plant",
        owner: "Jesse Pinkman",
        pledges: [],
        subtitle: "A very fancy project." },
      { archived: true,
        archive_reason: "Successfully funded. /",
        current: 1000,
        description: "Another sample description",
        goal: 1000,
        name: "Tesla coil",
        owner: "Heisenberg",
        pledges: [{amount: 1000, public: true, timestamp: r.now(), user: "Eddard Stark"}, {amount: 1000, public: false, timestamp: r.now(), user: "Ned Stark"}],
        subtitle: "A shiny project" },
      { archived: false,
        archive_reason: null,
        current: 100,
        description: "To be, or not to be...",
        goal: 200,
        name: "Laser kittens",
        owner: "Batman",
        pledges: [{amount: 100, public: true, timestamp: r.now(), user: "Daenerys Targaryen"}],
        subtitle: "An explosive project!"}]).run(connection);
})
.error(function(err) {
  console.log(err);
})
.finally(function() {
  if (connection) {
    connection.close();
  }
});
