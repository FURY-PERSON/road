/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-var-requires */

const open = require('open');
const path = require('path');


(async () => {
  await open(path.resolve(__dirname, '..', '.loki', 'report.html'), { 'wait': true });
})();
