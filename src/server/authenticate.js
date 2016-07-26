'use strict';

const auth = require('basic-auth');

module.exports = handler => [
  ['connection', data => {
    const user = auth(data.client.ws.upgradeReq);
    if (user && handler(user.name, user.pass)) {
      data.client.user = user.name;
    } else {
      data.client.ws.close();
    }
  }]
];
