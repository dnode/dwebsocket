'use strict';

module.exports = [
  ['connect', () => { console.log('try connect server'); }],
  ['connected', () => { console.log('server connected'); }],
  ['disconnect', () => { console.log('server disconnected'); }],
  ['client.emit', message => { console.log('outgoing client message', message) }],
  ['on', message => { console.log('incoming message', message) }]
];
