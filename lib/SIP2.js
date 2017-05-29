'use strict';

const net = require('net');
const parseResponse = require('../lib/parseResponse');

class SIP2 {

  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.socket = null;
  }

  connect(callback) {
    this.socket = new net.Socket();
    this.socket.setEncoding('utf8');

    this.socket.on('end', () => {
      console.log('Disconnected from SIP2 server');
    });

    this.socket.on('close', () => {
      console.log('SIP2 connection closed');
    });

    this.socket.connect(this.port, this.host, callback);
    return this;
  }

  send(request, callback) {
    if (!this.socket) {
      callback(new Error('No open SIP2 socket connection'));
    }
    this.socket.once('data', data => callback(null, parseResponse(data)));
    this.socket.once('error', err => callback(err));
    this.socket.write(request);
  }

  close() {
    if (this.socket) {
      // Add message
      this.socket.end();
    }
  }
}

module.exports = SIP2;
