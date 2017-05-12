'use strict';

const RequestMessage = require('../RequestMessage');

class ItemInformationRequest extends RequestMessage {
  constructor(itemIdentifier) {
    super('17');

    this.itemIdentifier = itemIdentifier;
    this.transactionDate = RequestMessage.getDateTime();
  }

  buildMessage() {
    this.append(this.transactionDate);
    this.append('AO');
    this.append(this.institutionId);
    this.append('|AB');
    this.append(this.itemIdentifier);
    if (this.terminalPassword) {
      this.append('|AC');
      this.append(this.terminalPassword);
    }
  }

}

module.exports = ItemInformationRequest;
