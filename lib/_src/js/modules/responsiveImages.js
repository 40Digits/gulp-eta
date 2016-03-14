import waitFor from 'waitFor';
import sassqwatch from 'sassqwatch';

waitFor('.sassqwatch', () => {
  // Make those images responsive
  sassqwatch.responsiveImages();
});
