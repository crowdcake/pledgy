"use strict";

var App = {
  init: function init() {
    
    console.log('App initialized.');
    
    $('#submit-pledgeform').click(function() {
      $('#pledgeform').submit();
    });

  }
};

module.exports = App;
