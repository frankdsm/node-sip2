'use strict';

class PatronStatus {
  constructor() {
    this.chargePrivilegesDenied = false;
    this.renewalPrivilegesDenied = false;
    this.recallPrivilegesDenied = false;
    this.holdPrivilegesDenied = false;
    this.cardReportedLost = false;
    this.tooManyItemsCharged = false;
    this.tooManyItemsOverdue = false;
    this.tooManyRenewals = false;
    this.tooManyClaimsOfItemsReturned = false;
    this.tooManyItemsLost = false;
    this.excessiveOutstandingFines = false;
    this.excessiveOutstandingFees = false;
    this.recallOverdue = false;
    this.tooManyItemsBilled = false;
  }


  toString() {
    return this.status;
  }
}

module.exports = Object.freeze(PatronStatus);
