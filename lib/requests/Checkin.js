'use strict';

const RequestMessage = require('../RequestMessage');

class CheckinRequest extends RequestMessage {
  constructor(returnDate, location, itemIdentifier, itemProperties) {
    super('09');

    this.noBlock = false;
    this.returnDate = returnDate || '                  ';
    this.currentLocation = location;
    this.itemIdentifier = itemIdentifier;
    this.itemProperties = itemProperties;
    this.transactionDate = RequestMessage.getDateTime();
    this.cancel = null;
  }

  buildMessage() {
    this.append(this.noBlock ? 'Y' : 'N');
    this.append(this.transactionDate);
    if (this.returnDate) {
      this.append(this.returnDate);
    }
    this.append('AP');
    this.append(this.currentLocation);
    this.append('|AO');
    this.append(this.institutionId);
    this.append('|AB');
    this.append(this.itemIdentifier);
    this.append('|AC');
    this.append(this.terminalPassword);
    if (this.itemProperties) {
      this.append('|CH');
      this.append(this.itemProperties);
    }
    if (this.cancel !== null) {
      this.append('|BI');
      this.append(this.cancel ? 'Y' : 'N');
    }
    if (this.patronPassword) {
      this.append('|AD');
      this.append(this.patronPassword);
    }
  }
}

module.exports = CheckinRequest;
