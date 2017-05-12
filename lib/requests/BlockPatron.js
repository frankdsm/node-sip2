'use strict';

const RequestMessage = require('../RequestMessage');

class BlockPatronRequest extends RequestMessage {
  constructor(cardRetained, blockedCardMessage) {
    super('01');

    this.retained = cardRetained;
    this.blockedCardMessage = blockedCardMessage;
    this.transactionDate = RequestMessage.getDateTime();
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

module.exports = BlockPatronRequest;
