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
        description: "Vestibulum consectetur rhoncus facilisis. Suspendisse eu fermentum sapien, consequat finibus diam. Pellentesque elementum, metus nec scelerisque luctus, ligula felis mattis ligula, et venenatis purus erat vel nunc. Donec in elementum augue. Donec mollis tellus vitae leo condimentum, a commodo massa interdum. Sed elit orci, semper sit amet leo vitae, pretium convallis velit. Morbi efficitur tempor imperdiet. Ut leo nisl, porta sit amet neque vitae, vestibulum auctor urna.",
        goal: 1337,
        name: "Nuclear power plant",
        owner: "Jesse Pinkman",
        pledges: [],
        subtitle: "A very fancy project." },
      { archived: true,
        archive_reason: "Successfully funded. /",
        current: 2000,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id orci fermentum, finibus libero eu, ullamcorper turpis. Cras ut commodo lorem. Phasellus mattis tellus id elit tristique, a bibendum nisl eleifend. In purus sem, fermentum at metus vitae, aliquet sagittis nisi. Donec vehicula ac enim at accumsan. Nullam malesuada id enim non pulvinar. Quisque mattis orci metus, non posuere massa vulputate vitae. Sed feugiat, justo a gravida pharetra, augue nibh cursus sem, sit amet convallis ligula neque in tortor. Cras rutrum dui in nulla maximus, ac auctor lectus condimentum. Donec tempor viverra tellus. Cras pulvinar pellentesque libero et vulputate. Phasellus efficitur purus nec tellus posuere sollicitudin. Maecenas mollis diam id lectus consequat, a suscipit ipsum sagittis. Cras pretium augue et ornare dignissim. Nunc ullamcorper urna ante, malesuada aliquet elit vehicula a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        goal: 2000,
        name: "Tesla coil",
        owner: "Heisenberg",
        pledges: [{amount: 1000, public: true, timestamp: r.now(), user: "Eddard Stark"}, {amount: 1000, public: false, timestamp: r.now(), user: "Ned Stark"}],
        subtitle: "A shiny project" },
      { archived: false,
        archive_reason: null,
        current: 100,
        description: "Maecenas at ligula mattis, sollicitudin lacus at, posuere leo. In sem nulla, tempus sed massa ut, porta elementum felis. Morbi porta facilisis dictum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse semper, ipsum non sodales consequat, turpis eros lacinia nisi, vitae varius leo magna sed lorem. Vestibulum vel erat sollicitudin, suscipit nisl viverra, egestas justo. Donec posuere massa non porta vulputate. Sed egestas turpis nec ante laoreet mollis. Etiam id interdum massa. Nunc tempor efficitur purus ut condimentum. Mauris ut tortor magna. Pellentesque efficitur aliquam malesuada.",
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
