'use strict';

module.exports = {
  Client: {
    Client: require('./client/client.js'),
    plugins: {
      authenticate: require('./client/plugins/authenticate.js')
    }
  },
  Server: {
    Server: require('./server/server.js'),
    plugins: {
      authenticate: require('./server/plugins/authenticate.js')
    }
  }
};
