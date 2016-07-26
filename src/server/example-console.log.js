'use strict';

module.exports = [
  ['connection', data => { console.log(`client connected (user: ${data.client.user})`); }],
  ['client.emit', data => { console.log(`outgoing client message (user: ${data.client.user})`, data.message) }],
  ['server.emit', data => { console.log('outgoing server message', data.message) }],
  ['message', data => { console.log(`incoming message (user: ${data.client.user})`, data.message) }]
];
