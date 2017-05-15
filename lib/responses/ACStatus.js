'use strict';

const ResponseMessage = require('../ResponseMessage');
const SupportedMessages = require('../variables/SupportedMessages');

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
    const messages = new SupportedMessages();
    if (bx) {
      messages.patronStatusRequest = this.charToBool(bx.charAt(0));
      messages.checkout = this.charToBool(bx.charAt(1));
      messages.checkin = this.charToBool(bx.charAt(2));
      messages.blockPatron = this.charToBool(bx.charAt(3));
      messages.SCACSStatus = this.charToBool(bx.charAt(4));
      messages.requestSCACSResend = this.charToBool(bx.charAt(5));
      messages.login = this.charToBool(bx.charAt(6));
      messages.patronInformation = this.charToBool(bx.charAt(7));
      messages.endPatronSession = this.charToBool(bx.charAt(8));
      messages.feePaid = this.charToBool(bx.charAt(9));
      messages.itemInformation = this.charToBool(bx.charAt(10));
      messages.itemStatusUpdate = this.charToBool(bx.charAt(11));
      messages.patronEnable = this.charToBool(bx.charAt(12));
      messages.hold = this.charToBool(bx.charAt(13));
      messages.renew = this.charToBool(bx.charAt(14));
      messages.renewAll = this.charToBool(bx.charAt(15));
    }
    data.supportedMessages = messages;

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
