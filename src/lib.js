'use strict';

module.exports = {
  Client: {
    Client: require('./client/client.js'),
    'basic-auth': require('./client/basic-auth.js'),
    reconnect: require('./client/reconnect.js'),
  },
  Server: {
    Server: require('./server/server.js'),
    'basic-auth': require('./server/basic-auth.js'),
    rooms: require('./server/rooms.js'),
  }
};
