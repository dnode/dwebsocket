'use strict';

const dwebsocket = require('./lib.js').Server;

const server = new dwebsocket.Server()
  .plugin(dwebsocket['basic-auth']((user, pass) => {
    return user === 'sharaal' && pass === 'sharaal';
  }))
  .plugin(dwebsocket.rooms)
  .plugin(require('./server/example-console.log.js'))
  .listen(process.env.PORT);

server.on('example', (client, data) => {
  console.log(`"example" messsage received (user: ${client.user})`, data);
  client.emit('example', { example: 'client.emit' });
  server.emit('example', { example: 'server.emit' });

  client.join('hello');
  server.to('hello').emit('example', { example: 'server.emit to "hello" room' });
});
