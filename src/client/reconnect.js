'use strict';

let url;
let options;

module.exports = intervall => [
  ['close', (data, client) => {
    setTimeout(() => { client.connect(url, options); }, intervall || 1000);
  }],
  ['connect', data => {
    url = data.url;
    options = data.options;
  }]
];
