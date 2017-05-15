'use strict';

const ResponseMessage = require('../ResponseMessage');
const CirculationStatus = require('../variables/CirculationStatus');
const SecurityMarker = require('../variables/SecurityMarker');
const FeeType = require('../variables/FeeType');
const MediaType = require('../variables/MediaType');

class ItemInformationResponse extends ResponseMessage {

  parse(message) {
    this.identifier = '18';
    this.message = message;

    const data = {};

    data.circulationStatus = CirculationStatus.parse(this.message.substring(2, 4));
    data.securityMarker = SecurityMarker.parse(this.message.substring(4, 6));
    data.feeType = FeeType.parse(this.message.substring(6, 8));
    data.transactionDate = this.parseDateTime(this.message.substring(8, 26));

    data.holdQueueLength = this.parseVariableWithoutDelimeter('CF', this.message.substring(26));
    data.dueDate = this.parseVariableWithoutDelimeter('AH', this.message.substring(26));
    data.recallDate = this.parseVariableWithoutDelimeter('CJ', this.message.substring(26));
    data.holdPickupDate = this.parseVariableWithoutDelimeter('CM', this.message.substring(26));

    data.itemIdentifier = this.parseVariableWithoutDelimeter('AB', this.message.substring(26));
    data.titleIdentifier = this.parseVariable('AJ', this.message.substring(26));

    data.owner = this.parseVariable('BG', this.message.substring(26));

    if (this.existsAndNotEmpty('CK', this.message.substring(26))) {
      data.mediaType = MediaType.parse(this.parseVariable('CK', this.message.substring(26)));
    }

    data.permanentLocation = this.parseVariable('AQ', this.message.substring(26));
    data.currentLocation = this.parseVariable('AP', this.message.substring(26));
    data.itemProperties = this.parseVariable('CH', this.message.substring(26));

    data.screenMessage = this.parseVariableMulti('AF', this.message.substring(26));
    data.printLine = this.parseVariableMulti('AG', this.message.substring(26));
    if (this.parseSequence(this.message) !== '') {
      data.sequence = parseInt(this.parseSequence(this.message), 10);
    }
    data.checksum = this.parseChecksum(this.message);

    return data;
  }
}

module.exports = ItemInformationResponse;
