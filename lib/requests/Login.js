'use strict';

const RequestMessage = require('../RequestMessage');

class LoginRequest extends RequestMessage {
  constructor(userId, password, locationCode) {
    super('93');
    this.UIDalgorithm = '0';
    this.PWDalgorithm = '0';
    this.userId = userId;
    this.password = password;
    this.locationCode = locationCode || '';
  }

  buildMessage() {
    this.append(this.UIDalgorithm, 1);
    this.append(this.PWDalgorithm, 1);
    this.append('CN');
    this.append(this.userId);
    this.append('|CO');
    this.append(this.password);
    this.append('|CP');
    this.append(this.locationCode || '');
  }
}

module.exports = LoginRequest;
