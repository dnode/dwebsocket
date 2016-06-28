'use strict';

const Client = require('./client.js');

const client = new Client()
  .plugin(require('./plugins/authenticate.js')('sharaal', 'sharaal'))
  .plugin(require('./plugins/console.log.js'))
  .plugin(require('./plugins/reconnect.js'))
  .connect();

client.emit('example', { example: 'client.emit' });
client.on('example', data => {
  console.log('"example" messsage received', data);
});
