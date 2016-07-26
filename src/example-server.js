'use strict';

const dwebsocket = require('./lib.js').Server;

const server = new dwebsocket.Server()
  .plugin(dwebsocket.authenticate((user, pass) => {
    return user === 'sharaal' && pass === 'sharaal';
  }))
  .plugin(require('./server/example-console.log.js'))
  .connect({ port: process.env.PORT });

server.on('example', (client, data) => {
  console.log(`"example" messsage received (user: ${client.user})`, data);
  client.emit('example', { example: 'client.emit' });
  server.emit('example', { example: 'server.emit' });
});
