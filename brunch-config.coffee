module.exports = config:
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^bower_components/
      order:
        before: [
          'bower_components/jquery/dist/jquery.js'
          'bower_components/Materialize/bin/materialize.js'
        ]
    stylesheets:
      joinTo:
        'stylesheets/app.css'
