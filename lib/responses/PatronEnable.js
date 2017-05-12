'use strict';

const ResponseMessage = require('../ResponseMessage');
const PatronStatus = require('../variables/PatronStatus');
const Language = require('../variables/Language');

class PatronEnableResponse extends ResponseMessage {

  parse(message) {
    this.identifier = '26';
    this.message = message;

    const data = {};

    const status = new PatronStatus();
    status.chargePrivilegesDenied = this.charEmptyToBool(this.message.charAt(2));
    status.renewalPrivilegedDenied = this.charEmptyToBool(this.message.charAt(3));
    status.recallPrivilegesDenied = this.charEmptyToBool(this.message.charAt(4));
    status.holdPrivilegesDenied = this.charEmptyToBool(this.message.charAt(5));
    status.cardReportedLost = this.charEmptyToBool(this.message.charAt(6));
    status.tooManyItemsCharged = this.charEmptyToBool(this.message.charAt(7));
    status.tooManyItemsOverdue = this.charEmptyToBool(this.message.charAt(8));
    status.tooManyRenewals = this.charEmptyToBool(this.message.charAt(9));
    status.tooManyClaimsOfItemsReturned = this.charEmptyToBool(this.message.charAt(10));
    status.tooManyItemsLost = this.charEmptyToBool(this.message.charAt(11));
    status.excessiveOutstandingFines = this.charEmptyToBool(this.message.charAt(12));
    status.excessiveOutstandingFees = this.charEmptyToBool(this.message.charAt(13));
    status.recallOverdue = this.charEmptyToBool(this.message.charAt(14));
    status.tooManyItemsBilled = this.charEmptyToBool(this.message.charAt(15));

    data.status = status;
    data.language = Language[this.message.substring(16, 19)];
    data.transactionDate = this.parseDateTime(this.message.substring(19, 37));
    data.institutionId = this.parseVariableWithoutDelimeter('AO', this.message.substring(37));
    data.patronIdentifier = this.parseVariable('AA', this.message.substring(37));
    data.personalName = this.parseVariable('AE', this.message.substring(37));

    // @TODO  existsAndNotEmpty

    data.feeAmount = this.parseVariable('BV', this.message.substring(37));
    data.screenMessage = this.parseVariableMulti('AF', this.message.substring(37));
    data.printLine = this.parseVariableMulti('AG', this.message.substring(37));
    if (this.parseSequence(this.message) !== '') {
      data.sequence = parseInt(this.parseSequence(this.message), 10);
    }
    data.checksum = this.parseChecksum(this.message);

    return data;
  }
}

module.exports = PatronEnableResponse;
