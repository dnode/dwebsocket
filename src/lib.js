'use strict';

module.exports = {
  Client: {
    Client: require('./client/client.js'),
    authenticate: require('./client/authenticate.js')
  },
  Server: {
    Server: require('./server/server.js'),
    authenticate: require('./server/authenticate.js')
  }
};
