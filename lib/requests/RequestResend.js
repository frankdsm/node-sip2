'use strict';

const RequestMessage = require('../RequestMessage');

class RequestResendRequest extends RequestMessage {
  constructor() {
    super('97');
    this.includeSequenceNumber = false;
  }

  buildMessage() {
  }

}

module.exports = RequestResendRequest;
