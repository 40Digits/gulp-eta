var waitFor = require('waitFor');
var sassqwatch = require('sassqwatch');

waitFor('.sassqwatch', function() {
  // make those images responsive
  sassqwatch.responsiveImages(); 
});