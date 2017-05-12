'use strict';

const ResponseMessage = require('../ResponseMessage');

class ACStatusResponse extends ResponseMessage {

  parse(message) {
    this.identifier = '98';
    this.message = message;

    const data = {};
    data.onLineStatus = this.charToBool(this.message.charAt(2));
    data.checkinOk = this.charToBool(this.message.charAt(3));
    data.checkoutOk = this.charToBool(this.message.charAt(4));
    data.ACSRenewalPolicy = this.charToBool(this.message.charAt(5));
    data.statusUpdateOk = this.charToBool(this.message.charAt(6));
    data.offLineOk = this.charToBool(this.message.charAt(7));
    data.timeoutPeriod = this.stringToInt(this.message.substring(8, 11));
    data.retriesAllowed = this.stringToInt(this.message.substring(11, 14));
    data.dateTimeSync = this.parseDateTime(this.message.substring(14, 32));
    data.protocolVersion = this.message.substring(32, 36);
    data.institutionId = this.parseVariableWithoutDelimeter('AO', this.message.substring(36));
    data.libraryName = this.parseVariable('AM', this.message.substring(36));

    const bx = this.parseVariable('BX', this.message.substring(36));
    // @TODO parse supported messages

    data.terminalLocation = this.parseVariable('AN', this.message.substring(36));
    data.screenMessage = this.parseVariableMulti('AF', this.message.substring(36));
    data.printLine = this.parseVariableMulti('AG', this.message.substring(36));
    if (this.parseSequence(this.message) !== '') {
      data.sequence = parseInt(this.parseSequence(this.message), 10);
    }
    data.checksum = this.parseChecksum(this.message);

    return data;
  }
}

module.exports = ACStatusResponse;
