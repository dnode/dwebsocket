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

  connect(url, options) {
    options = options || {};
    this.trigger('connect', { url, options });
    this.ws = new WebSocket(url, options);
    this.ws.on('close', () => {
      this.trigger('close');
    });
    this.ws.on('error', () => {
      this.trigger('error');
    });
    this.ws.on('message', (message, flags) => {
      try {
        message = JSON.parse(message);
        this.trigger('message', { message, flags });
        for (const handler of this.handlers.get(message[0]) || []) {
          handler(message[1], flags, this);
        }
      } catch(e) {}
    });
    this.ws.on('open', () => {
      this.trigger('open');
    });
    return this;
  }

  emit(event, data) {
    let message = [event, data];
    const send = () => {
      this.trigger('client.emit', [message]);
      message = JSON.stringify(message);
      this.ws.send(message);
    }
    if (this.ws.readyState === WebSocket.OPEN) {
      send();
    } else {
      this.ws.once('open', send);
    }
    return this;
  }
}

module.exports = Client;
