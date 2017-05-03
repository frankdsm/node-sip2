'use strict';

const net = require('net');

class SIP2 {

  constructor(host, port, username, password, extraNumber) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.extraNumber = extraNumber;
  }

  open() {
    this.socket = new net.Socket();
    this.socket.connect(this.port, this.host, () => {
      console.log('connected to server');
    });

    this.socket.on('data', (data) => {
      console.log(data.toString());
    });

    this.socket.on('end', () => {
      console.log('disconnected from server');
    });
  }

  close() {
    if (this.client) {
      // Add message
      this.client.end();
    }
  }
}

module.exports = SIP2;
