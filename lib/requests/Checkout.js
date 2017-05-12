'use strict';

const RequestMessage = require('../RequestMessage');

class CheckoutRequest extends RequestMessage {
  constructor(scRenewalPolicy, nbDueDate, itemIdentifier, itemProperties, feeAcknowledged) {
    super('11');

    this.scRenewalPolicy = scRenewalPolicy;
    this.noBlock = false;
    this.itemIdentifier = itemIdentifier;
    this.nbDueDate = nbDueDate;
    this.itemProperties = itemProperties || '';
    this.feeAcknowledged = feeAcknowledged || null;
    this.transactionDate = RequestMessage.getDateTime();
    this.cancel = null;
  }

  buildMessage() {
    this.append(this.scRenewalPolicy ? 'Y' : 'N');
    this.append(this.noBlock ? 'Y' : 'N');
    this.append(this.transactionDate);
    this.append(this.nbDueDate);
    this.append('AO');
    this.append(this.institutionId);
    this.append('|AA');
    this.append(this.patronIdentifier);
    this.append('|AB');
    this.append(this.itemIdentifier);
    this.append('|AC');
    this.append(this.terminalPassword);
    if (this.itemProperties) {
      this.append('|CH');
      this.append(this.itemProperties);
    }
    if (this.patronPassword) {
      this.append('|AD');
      this.append(this.patronPassword);
    }
    if (this.feeAcknowledged !== null) {
      this.append('|BO');
      this.append(this.feeAcknowledged ? 'Y' : 'N');
    }
    if (this.cancel !== null) {
      this.append('|BI');
      this.append(this.cancel ? 'Y' : 'N');
    }
  }
}

module.exports = CheckoutRequest;
