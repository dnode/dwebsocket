'use strict';

let count = 0;

module.exports = (intervall) => [
  ['connected', () => {
    if (count) {
      console.log(`successfull reconnect to the server (count: ${count})`);
      count = 0;
    }
  }],
  ['disconnect', (client) => {
    ++count;
    console.log(`try to reconnect to the server (count: ${count})`);
    setTimeout(() => { client.connect(); }, intervall || 1000);
  }]
];
