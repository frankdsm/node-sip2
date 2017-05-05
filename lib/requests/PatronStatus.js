'use strict';

const Message = require('../Message');

class PatronStatus extends Message {
  constructor() {
    super('23');
    this.transactionDate = Message.getDateTime();
  }

  buildMessage() {
    this.append(this.language);
    this.append(this.transactionDate);
    this.append('AO');
    this.append(this.institutionId);
    this.append('|AA');
    this.append(this.patronIdentifier);
    this.append('|AC');
    this.append(this.terminalPassword);
    this.append('|AD');
    this.append(this.patronPassword);
  }

}

module.exports = PatronStatus;
