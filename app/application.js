"use strict";

var App = {
  init: function init() {
    
    console.log('App initialized.');
    
    $('#submit-pledgeform').click(function() {
      $('#pledgeform').submit();
    });

    $('#datepicker').pickadate({
      selectMonths: true,
      min: new Date()
    });

  }
};

module.exports = App;
