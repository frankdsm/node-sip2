'use strict';

const RequestMessage = require('../RequestMessage');
const FeeType = require('../variables/FeeType');
const PaymentType = require('../variables/PaymentType');
const CurrencyType = require('../variables/CurrencyType');

class FeePaidRequest extends RequestMessage {
  constructor(feeType, paymentType, currencyType, feeAmount, feeIdentifier, transactionId) {
    super('37');

    this.feeType = feeType || FeeType.OTHER_UNKNOWN;
    this.paymentType = paymentType || PaymentType.CASH;
    this.currencyType = currencyType || CurrencyType.EURO;
    this.feeAmount = feeAmount;
    this.feeIdentifier = feeIdentifier;
    this.transactionId = transactionId;
    this.transactionDate = RequestMessage.getDateTime();
  }

  buildMessage() {
    this.append(this.transactionDate);
    this.append(this.feeType);
    this.append(this.paymentType);
    this.append(this.currencyType);
    this.append('BV');
    this.append(this.feeAmount);
    this.append('|AO');
    this.append(this.institutionId);
    this.append('|AA');
    this.append(this.patronIdentifier);
    if (this.terminalPassword) {
      this.append('|AC');
      this.append(this.terminalPassword);
    }
    if (this.patronPassword) {
      this.append('|AD');
      this.append(this.patronPassword);
    }
    if (this.feeIdentifier) {
      this.append('|CG');
      this.append(this.feeIdentifier);
    }
    if (this.transactionId) {
      this.append('|BK');
      this.append(this.transactionId);
    }
  }
}

module.exports = FeePaidRequest;
