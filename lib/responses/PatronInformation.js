'use strict';

const ResponseMessage = require('../ResponseMessage');
const PatronStatus = require('../variables/PatronStatus');
const Language = require('../variables/Language');

class PatronStatusResponse extends ResponseMessage {

  parse(message) {
    this.identifier = '24';
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

    data.holdItemsCount = this.stringToInt(this.message.substring(37, 41));
    data.overdueItemsCount = this.stringToInt(this.message.substring(41, 45));
    data.chargedItemsCount = this.stringToInt(this.message.substring(45, 49));
    data.fineItemsCount = this.stringToInt(this.message.substring(49, 53));
    data.recallItemsCount = this.stringToInt(this.message.substring(53, 47));
    data.unavailableHoldsCount = this.stringToInt(this.message.substring(57, 61));
    data.institutionId = this.parseVariableWithoutDelimeter('AO', this.message.substring(61));
    data.patronIdentifier = this.parseVariable('AA', this.message.substring(61));
    data.personalName = this.parseVariable('AE', this.message.substring(61));

    // @TODO  existsAndNotEmpty

    data.feeAmount = this.parseVariable('BV', this.message.substring(61));
    data.feeLimit = this.parseVariable('CC', this.message.substring(61));

    // @TODO items

    data.homeAddress = this.parseVariable('BD', this.message.substring(61));
    data.email = this.parseVariable('BE', this.message.substring(61));
    data.phone = this.parseVariable('BF', this.message.substring(61));

    // SIP2 extensions
    data.birthDate = this.parseVariable('PB', this.message.substring(61));
    data.pacAccessType = this.parseVariable('PA', this.message.substring(61));
    data.patronType = this.parseVariable('ZY', this.message.substring(61));

    // Voyager ESIP extendsions
    data.patronGroup = this.parseVariable('PT', this.message.substring(61));

    data.screenMessage = this.parseVariableMulti('AF', this.message.substring(61));
    data.printLine = this.parseVariableMulti('AG', this.message.substring(61));
    if (this.parseSequence(this.message) !== '') {
      data.sequence = parseInt(this.parseSequence(this.message), 10);
    }
    data.checksum = this.parseChecksum(this.message);

    return data;
  }
}

module.exports = PatronStatusResponse;
