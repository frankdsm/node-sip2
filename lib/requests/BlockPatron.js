'use strict';

const Message = require('../Message');

class BlockPatron extends Message {
  constructor(cardRetained, blockedCardMessage) {
    super('01');

    this.retained = cardRetained;
    this.blockedCardMessage = blockedCardMessage;
    this.transactionDate = Message.getDateTime();
  }

  buildMessage() {
    this.append(this.cardRetained ? 'Y' : 'N');
    this.append(this.transactionDate);
    this.append('AO');
    this.append(this.institutionId);
    this.append('|AL');
    this.append(this.blockedCardMessage);
    this.append('|AA');
    this.append(this.patronIdentifier);
    this.append('|AC');
    this.append(this.terminalPassword);
  }
}

module.exports = BlockPatron;
