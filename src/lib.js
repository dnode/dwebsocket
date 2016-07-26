'use strict';

module.exports = {
  Client: {
    Client: require('./client/client.js'),
    authenticate: require('./client/authenticate.js'),
    reconnect: require('./client/reconnect.js'),
  },
  Server: {
    Server: require('./server/server.js'),
    authenticate: require('./server/authenticate.js'),
    rooms: require('./server/rooms.js'),
  }
};
