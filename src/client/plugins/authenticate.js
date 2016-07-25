'use strict';

module.exports = (user, pass) => [
  ['connect', options => {
    const authorization = `Basic ${new Buffer(`${user}:${pass}`).toString('base64')}`;
    options.headers = { authorization };
  }]
];
