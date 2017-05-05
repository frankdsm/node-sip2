'use strict';

const Message = require('../Message');

class RequestResend extends Message {
  constructor() {
    super('97');
    this.includeSequenceNumber = false;
  }

  buildMessage() {
  }

}

module.exports = RequestResend;
