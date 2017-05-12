'use strict';

const ResponseMessage = require('../ResponseMessage');
const Language = require('../variables/Language');
const CirculationStatus = require('../variables/CirculationStatus');
const SecurityMarker = require('../variables/SecurityMarker');
const FeeType = require('../variables/FeeType');

class CheckoutResponse extends ResponseMessage {

  parse(message) {
    this.identifier = '12';
    this.message = message;

    const data = {};

    data.ok = this.intToBool(this.message.charAt(2));
    data.renewalOk = this.charToBool(this.message.charAt(3));
    if (['U', 'N'].indexOf(this.message.charAt(4)) > -1) {
      data.magneticMediaSupported = false;
      data.magneticMedia = false;
    } else {
      data.magneticMediaSupported = true;
      data.megnaticMedia = this.charToBool(this.message.charAt(4));
    }
    if (['U', 'N'].indexOf(this.message.charAt(5)) > -1) {
      data.desensitizeSupported = false;
      data.desensitize = false;
    } else {
      data.desensitizeSupported = false;
      data.desensitize = this.charToBool(this.message.charAt(5));
    }
    data.transactionDate = this.parseDateTime(this.message.substring(6, 24));

    data.institutionId = this.parseVariableWithoutDelimeter('AO', this.message.substring(24));
    data.patronIdentifier = this.parseVariable('AA', this.message.substring(24));
    data.itemIdentifier = this.parseVariable('AB', this.message.substring(24));
    data.titleIdentifier = this.parseVariable('AJ', this.message.substring(24));
    data.dueDate = this.parseVariable('AH', this.message.substring(24));

    // @TODO  existsAndNotEmpty

    data.itemProperties = this.parseVariable('CH', this.message.substring(24));
    data.transactionId = this.parseVariable('BK', this.message.substring(24));

    data.feeAmount = this.parseVariable('BV', this.message.substring(24));
    data.screenMessage = this.parseVariableMulti('AF', this.message.substring(24));
    data.printLine = this.parseVariableMulti('AG', this.message.substring(24));
    if (this.parseSequence(this.message) !== '') {
      data.sequence = parseInt(this.parseSequence(this.message), 10);
    }
    data.checksum = this.parseChecksum(this.message);

    return data;
  }
}

module.exports = CheckoutResponse;
