'use strict';

const ResponseMessage = require('../ResponseMessage');

class FeePaidResponse extends ResponseMessage {

  parse(message) {
    this.identifier = '38';
    this.message = message;

    const data = {};

    data.paymentAccepted = this.charToBool(this.message.charAt(2));
    data.transactionDate = this.parseDateTime(this.message.substring(3, 21));

    data.institutionId = this.parseVariableWithoutDelimeter('AO', this.message.substring(21));
    data.patronIdentifier = this.parseVariable('AA', this.message.substring(21));

    data.transactionId = this.parseVariable('BK', this.message.substring(21));

    data.screenMessage = this.parseVariableMulti('AF', this.message.substring(21));
    data.printLine = this.parseVariableMulti('AG', this.message.substring(21));
    if (this.parseSequence(this.message) !== '') {
      data.sequence = parseInt(this.parseSequence(this.message), 10);
    }
    data.checksum = this.parseChecksum(this.message);

    return data;
  }
}

module.exports = FeePaidResponse;
