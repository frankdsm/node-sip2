'use strict';

class SupportedMessages {
  constructor() {
    this.patronStatusRequest = false;
    this.checkout = false;
    this.checkin = false;
    this.blockPatron = false;
    this.SCACSStatus = false;
    this.requestSCACSResend = false;
    this.login = false;
    this.patronInformation = false;
    this.endPatronSession = false;
    this.feePaid = false;
    this.itemInformation = false;
    this.itemStatusUpdate = false;
    this.patronEnable = false;
    this.hold = false;
    this.renew = false;
    this.renewAll = false;
  }
}

module.exports = SupportedMessages;
