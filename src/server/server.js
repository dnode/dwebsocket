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

  trigger(type, data) {
    for (const hook of this.hooks.get(type) || []) {
      hook(data, this);
    }
    return this;
  }

  on(event, handler) {
    if (this.handlers.has(event)) {
      this.handlers.get(event).push(handler);
    }
    this.handlers.set(event, [handler]);
    return this;
  }

  connect(port, options) {
    if (typeof port === 'object') {
      options = port;
    } else {
      options = options || {};
      if (port) {
        options.port = port;
      }
    }
    this.trigger('connect', { options });
    this.wss = new WebSocket.Server(options);
    this.wss.on('connection', ws => {
      if (ws.readyState === WebSocket.CLOSED) {
        return;
      }
      const client = {
        emit: (event, data) => {
          let message = [event, data];
          this.trigger('client.emit', { client, message });
          message = JSON.stringify(message);
          ws.send(message);
        },
        ws
      };
      this.trigger('connection', { client });
      ws.on('message', message => {
        try {
          message = JSON.parse(message);
          this.trigger('message', { client, message });
          for (const handler of this.handlers.get(message[0]) || []) {
            handler(client, message[1]);
          }
        } catch(e) {}
      });
    });
    return this;
  }

  emit(event, data) {
    let message = [event, data];
    this.trigger('server.emit', { message });
    message = JSON.stringify(message);
    for (const client of this.wss.clients) {
      client.send(message);
    }
    return this;
  }
}

module.exports = Server;
