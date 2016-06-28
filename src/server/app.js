'use strict';

const Server = require('./server.js');

const server = new Server()
  .plugin(require('./plugins/authenticate')((user, pass) => {
    return user === 'sharaal' && pass === 'sharaal';
  }))
  .plugin(require('./plugins/console.log.js'))
  .connect();

server.on('example', (client, data) => {
  console.log(`"example" messsage received (user: ${client.user})`, data);
  client.emit('example', { example: 'client.emit' });
  server.emit('example', { example: 'server.emit' });
});
