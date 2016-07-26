'use strict';

const auth = require('basic-auth');

module.exports = handler => [
  ['connect', (client, ws) => {
    const user = auth(ws.upgradeReq);
    if (user && handler(user.name, user.pass)) {
      client.user = user.name;
    } else {
      ws.close();
    }
  }]
];
