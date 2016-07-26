'use strict';

const dwebsocket = require('./lib.js').Client;

const client = new dwebsocket.Client()
  .plugin(dwebsocket.authenticate('sharaal', 'sharaal'))
  .plugin(dwebsocket.reconnect())
  .plugin(require('./client/example-console.log.js'))
  .connect(process.env.PORT);

client.emit('example', { example: 'client.emit' });
client.on('example', data => {
  console.log('"example" messsage received', data);
});
