'use strict';

const WebSocket = require('ws');

class Server {
  constructor() {
    this.handlers = new Map();
    this.hooks = new Map();
  }

  hook(type, hook) {
    if (this.hooks.has(type)) {
      this.hooks.get(type).push(hook);
    } else {
      this.hooks.set(type, [hook]);
    }
    return this;
  }

  plugin(plugin) {
    for (const hook of plugin) {
      this.hook(hook[0], hook[1]);
    }
    return this;
  }

  setPort(port) {
    this.port = port;
    return this;
  }

  connect() {
    this.wss = WebSocket.Server({ port: process.env.PORT || this.port });
    this.wss.on('connection', ws => {
      const client = {};
      for (const hook of this.hooks.get('connect') || []) {
        hook(client, ws);
      }
      if (ws.readyState === WebSocket.CLOSED) {
        return;
      }
      for (const hook of this.hooks.get('connected') || []) {
        hook(client);
      }
      client.emit = (event, data) => {
        const message = JSON.stringify([event, data]);
        for (const hook of this.hooks.get('client.emit') || []) {
          hook(client, message);
        }
        ws.send(message);
      };
      ws.on('message', message => {
        try {
          message = JSON.parse(message);
          for (const hook of this.hooks.get('on') || []) {
            hook(client, message);
          }
          for (const handler of this.handlers.get(message[0]) || []) {
            handler(client, message[1]);
          }
        } catch(e) {}
      });
    });
    return this;
  }

  on(event, handler) {
    if (this.handlers.has(event)) {
      this.handlers.get(event).push(handler);
    }
    this.handlers.set(event, [handler]);
    return this;
  }

  emit(event, data) {
    const message = JSON.stringify([event, data]);
    for (const hook of this.hooks.get('server.emit') || []) {
      hook(message);
    }
    for (const client of this.wss.clients) {
      client.send(message);
    }
    return this;
  }
}

module.exports = Server;
