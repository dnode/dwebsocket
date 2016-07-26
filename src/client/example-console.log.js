'use strict';

module.exports = [
  ['client.emit', data => { console.log('outgoing client message', data.message) }],
  ['close', () => { console.log('server disconnected'); }],
  ['connect', () => { console.log('try connect server'); }],
  ['message', data => { console.log('incoming message', data.message) }],
  ['open', () => { console.log('server connected'); }],
];
