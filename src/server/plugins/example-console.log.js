'use strict';

module.exports = [
  ['connected', (client, ws) => { console.log(`client connected (user: ${client.user})`); }],
  ['client.emit', (client, message) => { console.log(`outgoing client message (user: ${client.user})`, message) }],
  ['server.emit', message => { console.log('outgoing server message', message) }],
  ['on', (client, message) => { console.log(`incoming message (user: ${client.user})`, message) }]
];
