'use strict';

const WebSocket = require('ws');

class Client {
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

  setHost(host) {
    this.host = host;
    return this;
  }

  setPort(port) {
    this.port = port;
    return this;
  }

  connect() {
    const options = {};
    for (const hook of this.hooks.get('connect') || []) {
      hook(options);
    }
    this.ws = WebSocket(`ws://${process.env.HOST || this.host || 'localhost'}:${process.env.PORT || this.port}`, null, options);
    this.ws.on('close', () => {
      for (const hook of this.hooks.get('disconnect') || []) {
        hook(this);
      }
    });
    this.ws.on('error', () => {
      for (const hook of this.hooks.get('error') || []) {
        hook(this);
      }
    });
    this.ws.on('message', message => {
      try {
        message = JSON.parse(message);
        for (const hook of this.hooks.get('on') || []) {
          hook(message);
        }
        for (const handler of this.handlers.get(message[0]) || []) {
          handler(message[1]);
        }
      } catch(e) {}
    });
    this.ws.on('open', () => {
      for (const hook of this.hooks.get('connected') || []) {
        hook(this);
      }
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
    const send = () => {
      for (const hook of this.hooks.get('client.emit') || []) {
        hook(message);
      }
      this.ws.send(message);
    }
    if (this.ws.readyState === WebSocket.OPEN) {
      send();
    } else {
      this.ws.on('open', send);
    }
    return this;
  }
}

module.exports = Client;
