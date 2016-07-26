'use strict';

const dwebsocket = require('./lib.js').Client;

const client = new dwebsocket.Client()
  .plugin(dwebsocket.authenticate('sharaal', 'sharaal'))
  .plugin(require('./client/example-console.log.js'))
  .plugin(dwebsocket.reconnect())
  .connect(`ws://${process.env.HOST || '127.0.0.1'}:${process.env.PORT}`);

client.emit('example', { example: 'client.emit' });
client.on('example', data => {
  console.log('"example" messsage received', data);
});
