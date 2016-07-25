'use strict';

const dwebsocket = require('./lib.js').Client;

const client = new dwebsocket.Client()
  .plugin(dwebsocket.plugins.authenticate('sharaal', 'sharaal'))
  .plugin(require('./client/plugins/example-console.log.js'))
  .plugin(require('./client/plugins/example-reconnect.js')())
  .connect();

client.emit('example', { example: 'client.emit' });
client.on('example', data => {
  console.log('"example" messsage received', data);
});
