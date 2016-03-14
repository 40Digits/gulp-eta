import waitFor from 'waitFor';

waitFor('#sample-view', () => {
  const sampleTemplate = require('../templates/sampleTemplate.ejs');
  console.log('Sample EJS Template');

  console.log(sampleTemplate({ data: 'Hello' }));
});
