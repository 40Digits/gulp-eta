import waitFor from 'waitFor';

waitFor('#sample-view', () => {
  const $sampleView = $('#sample-view');
  const sampleTemplate = require('../templates/sampleTemplate.ejs');

  console.log('Sample EJS Template');

  $sampleView.html(sampleTemplate({ data: 'Hello' }));
});
