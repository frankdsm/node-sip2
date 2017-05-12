'use strict';

const ResponseMessage = require('../ResponseMessage');

class LoginResponse extends ResponseMessage {

  parse(message) {
    this.identifier = '94';
    this.message = message;
    const data = {
      ok: this.intToBool(this.message.charAt(2)),
    };

    return data;
  }
}

module.exports = LoginResponse;
