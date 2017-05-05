'use strict';

const dateFormat = require('dateformat');

class Message {

  constructor(identifier) {
    // Command identifier
    this.identifier = identifier;

    // Build message
    this.message = '';

    // Message terminator
    this.messageTerminator = '\r\n';

    // Delimiter
    this.delimiter = '|';

    // Location code
    this.locationCode = '';
    // Institution id
    this.institutionId = '';
    // Terminal password
    this.terminalPassword = '';
    // Patron identifier
    this.patronIdentifier = '';
    // Patron password
    this.patronPassword = '';
    // Language
    this.language = '001';

    // Maximum retries
    this.maxRetries = 3;

    // Error detection
    this.errorDetection = true;

    // Sequence number
    this.sequence = 0;
    if (this.sequence > 9) {
      this.sequence = 0;
    }
    this.includeSequenceNumber = true;
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

  static getDateTime(date) {
    if (!date) {
      date = new Date();
    }
    return dateFormat(date, 'yyyymmdd    HHMMss');
  }

  append(value) {
    if (value) {
      this.message += value;
    }
  }

  buildMessage() {
    // @QTODO throw error
    throw new Error('Method needs to be implemented by sub class');
  }

  getMessage() {
    this.message = '';

    if (this.identifier) {
      this.append(this.identifier);
    }

    this.buildMessage();

    if (this.errorDetection) {
      if (this.includeSequenceNumber) {
        this.append(`|AY${this.sequence}`);
      }
      this.append('AZ');
      const checksum = Message.getChecksum(this.message);
      this.append(checksum);
    }

    this.message += this.messageTerminator;

    return this.message;
  }

}

module.exports = Message;
