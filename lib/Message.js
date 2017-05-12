'use strict';

const dateFormat = require('dateformat');

class Message {

  static getDateTime(date) {
    if (!date) {
      date = new Date();
    }
    return dateFormat(date, 'yyyymmdd    HHMMss');
  }

  static getChecksum(message) {
    const messageChars = message.split('');
    let checksum = 0;
    messageChars.forEach((char) => {
      checksum += char.charCodeAt(0);
    });
    checksum = -(checksum & 0xFFFF);
    return (checksum >>> 0).toString(16).substring(4, 8).toUpperCase();
  }

}

module.exports = Message;
