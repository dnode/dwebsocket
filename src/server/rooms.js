'use strict';

const rooms = new Map();

module.exports = [
  ['connection', (data, server) => {
    data.client.join = room => {
      if (rooms.has(room)) {
        rooms.get(room).push(data.client);
      }
      rooms.set(room, [data.client]);
    };
    server.to = room => {
      return {
        emit: (event, data) => {
          for (const client of rooms.get(room) || []) {
            client.emit(event, data);
          }
        }
      };
    };
  }]
];
