'use strict';

module.exports = (user, pass) => [
  ['connect', data => {
    const authorization = `Basic ${new Buffer(`${user}:${pass}`).toString('base64')}`;
    data.options.headers = { authorization };
  }]
];
