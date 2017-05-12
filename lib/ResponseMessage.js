'use strict';

const Message = require('./Message');

class ResponseMessage extends Message {

  parseDateTime(value) {
    const year = parseInt(value.substring(0, 4), 10);
    const month = parseInt(value.substring(4, 6), 10) - 1;
    const day = parseInt(value.substring(6, 8), 10);
    const hours = parseInt(value.substring(12, 14), 10);
    const minutes = parseInt(value.substring(14, 16), 10);
    const seconds = parseInt(value.substring(16, 18), 10);
    return new Date(year, month, day, hours, minutes, seconds);
  }

  parseVariable(prefix, message) {
    const regexp = new RegExp('\\|' + prefix + '(.*?)\\|');
    const matches = message.match(regexp);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return null;
  }

  parseVariableWithoutDelimeter(prefix, message) {
    const regexp = new RegExp(prefix + '(.*?)\\|');
    const matches = message.match(regexp);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return null;
  }

  parseVariableMulti(prefix, message) {
    const results = [];
    const regexp = new RegExp('\\|(((' + prefix + '.*?)\\|)+)');
    const matches = message.match(regexp);
    if (matches && matches.length > 1) {
      const splits = matches[1].split('|');
      splits.forEach((split) => {
        if (split.substring(2)) {
          results.push(split.substring(2));
        }
      });
      return results;
    }
    return null;
  }

  parseSequence(message) {
    const regexp = new RegExp('\\|AY(\\d{1})');
    const matches = message.match(regexp);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return false;
  }

  parseChecksum(message) {
    const regexp = new RegExp('\\|(AY\\d{1}|)AZ(\\w{4})');
    const matches = message.match(regexp);
    if (matches && matches.length > 2) {
      return matches[2];
    }
    return '';
  }

  intToBool(value) {
    if (value === '1') {
      return true;
    }
    if (value === '0') {
      return false;
    }
    return null;
  }

  charToBool(char) {
    if (char === 'Y') {
      return true;
    }
    if (char === 'N') {
      return false;
    }
    return null;
  }

  charEmptyToBool(char) {
    if (char === ' ') {
      return false;
    } else if (char === 'Y') {
      return true;
    }
    return null;
  }

  stringToInt(value) {
    return parseInt(value, 10);
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

module.exports = ResponseMessage;
