var waitFor = require('waitFor');

waitFor('#sample-view', function() {
  console.log('Sample EJS Template');

  var sampleTemplate = require('../templates/sampleTemplate.ejs');

  console.log(sampleTemplate({ data: "Hello" }));
});