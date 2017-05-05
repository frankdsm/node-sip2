'use strict';

const Message = require('../Message');

class ItemInformation extends Message {
  constructor(itemIdentifier) {
    super('17');

    this.itemIdentifier = itemIdentifier;
    this.transactionDate = Message.getDateTime();
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

module.exports = ItemInformation;
