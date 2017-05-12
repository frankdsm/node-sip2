'use strict';

const assert = require('assert');

// Messages
const parseResponse = require('../lib/parseResponse');
// const Message = require('../lib/Message');

describe('LoginResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 login message', (done) => {
      const testResponse = '941AY3AZFDFA\r\n';
      const response = parseResponse(testResponse);
      assert.equal(response.ok, true);
      done();
    });
  });
});

describe('ACStatusResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 AC status message', (done) => {
      const testResponse = '98YYYNYN01000319960214    1447001.00AOID_21|AMCentral Library|ANtty30|AFScreen Message|AGPrint Message|AY1AZDA74\r\n';
      const response = parseResponse(testResponse);
      assert.equal(response.onLineStatus, true);
      assert.equal(response.checkinOk, true);
      assert.equal(response.checkoutOk, true);
      assert.equal(response.ACSRenewalPolicy, false);
      assert.equal(response.statusUpdateOk, true);
      assert.equal(response.offLineOk, false);
      assert.equal(response.timeoutPeriod, 10);
      assert.equal(response.retriesAllowed, 3);
      assert.equal(response.dateTimeSync.toString(), 'Wed Feb 14 1996 14:47:00 GMT+0000 (UTC)');
      assert.equal(response.protocolVersion, '1.00');
      assert.equal(response.institutionId, 'ID_21');
      assert.equal(response.libraryName, 'Central Library');
      assert.equal(response.terminalLocation, 'tty30');
      assert.equal(response.screenMessage.indexOf('Screen Message') > -1, true);
      assert.equal(response.printLine.indexOf('Print Message') > -1, true);

      // @TODO  Fix this
      // const checksum = Message.getChecksum('98YYYNYN01000319960214    1447001.00AOID_21|AMCentral Library|ANtty30|AFScreen Message|AGPrint Message|AY1AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});

describe('PatronStatusResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 patron status message', (done) => {
      const testResponse = '24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZDFC4\r\n';
      const response = parseResponse(testResponse);

      // Patron status
      assert.equal(response.status.chargePrivilegesDenied, false);
      assert.equal(response.status.renewalPrivilegesDenied, false);
      assert.equal(response.status.recallPrivilegesDenied, false);
      assert.equal(response.status.holdPrivilegesDenied, false);
      assert.equal(response.status.cardReportedLost, false);
      assert.equal(response.status.tooManyItemsCharged, false);
      assert.equal(response.status.tooManyItemsOverdue, false);
      assert.equal(response.status.tooManyRenewals, false);
      assert.equal(response.status.tooManyClaimsOfItemsReturned, false);
      assert.equal(response.status.tooManyItemsLost, false);
      assert.equal(response.status.excessiveOutstandingFines, false);
      assert.equal(response.status.excessiveOutstandingFees, false);
      assert.equal(response.status.recallOverdue, false);
      assert.equal(response.status.tooManyItemsBilled, false);
      assert.equal(response.status.renewalPrivilegedDenied, false);

      assert.equal(response.language, 'english');
      assert.equal(response.transactionDate, 'Mon Feb 12 1996 10:02:39 GMT+0000 (UTC)');
      assert.equal(response.patronIdentifier, '104000000105');
      assert.equal(response.personalName, 'John Doe');
      assert.equal(response.feeAmount, null);
      assert.equal(response.screenMessage.indexOf('Screen Message') > -1, true);
      assert.equal(response.printLine.indexOf('Check Print message') > -1, true);
      assert.equal(response.sequence, 2);

      // const checksum = Message.getChecksum('24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});

describe('PatronInformationResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 patron information message', (done) => {
      const testResponse = '64              00119980723 104009000100000002000100020000AOInstitutionID for PatronID|AAPatronID|AEPatron Name|BZ0002|CA0003|CB0010|BLY|ASItemID1 for PatronID|AUChargeItem1|AUChargeItem2|BDHome Address|BEE Mail Address|BFHome Phone for PatronID|AFScreenMessage 0 for PatronID, Language 1|AFScreen Message 1 for PatronID, Language 1|AFScreen Message 2 for PatronID, Language 1|AGPrint Line 0 for PatronID, Language 1|AGPrint Line 1 for PatronID, Language 1|AGPrint Line 2 for PatronID, language 1|AY4AZ608F\r\n';
      const response = parseResponse(testResponse);

      // Patron status
      assert.equal(response.status.chargePrivilegesDenied, false);
      assert.equal(response.status.renewalPrivilegesDenied, false);
      assert.equal(response.status.recallPrivilegesDenied, false);
      assert.equal(response.status.holdPrivilegesDenied, false);
      assert.equal(response.status.cardReportedLost, false);
      assert.equal(response.status.tooManyItemsCharged, false);
      assert.equal(response.status.tooManyItemsOverdue, false);
      assert.equal(response.status.tooManyRenewals, false);
      assert.equal(response.status.tooManyClaimsOfItemsReturned, false);
      assert.equal(response.status.tooManyItemsLost, false);
      assert.equal(response.status.excessiveOutstandingFines, false);
      assert.equal(response.status.excessiveOutstandingFees, false);
      assert.equal(response.status.recallOverdue, false);
      assert.equal(response.status.tooManyItemsBilled, false);
      assert.equal(response.status.renewalPrivilegedDenied, false);

      assert.equal(response.language, 'english');
      assert.equal(response.transactionDate, 'Thu Jul 23 1998 01:30:00 GMT+0000 (UTC)');
      assert.equal(response.holdItemsCount, 1000);
      assert.equal(response.overdueItemsCount, 0);
      assert.equal(response.chargedItemsCount, 2000);
      assert.equal(response.fineItemsCount, 1000);
      assert.equal(response.recallItemsCount, 1000);
      assert.equal(response.unavailableHoldsCount, 0);

      assert.equal(response.patronIdentifier, 'PatronID');
      assert.equal(response.personalName, 'Patron Name');
      assert.equal(response.feeAmount, null);
      assert.equal(response.feeLimit, null);

      assert.equal(response.homeAddress, 'Home Address');
      assert.equal(response.email, 'E Mail Address');
      assert.equal(response.phone, 'Home Phone for PatronID');
      assert.equal(response.birthDate, null);
      assert.equal(response.pacAccessType, null);
      assert.equal(response.patronType, null);
      assert.equal(response.patronGroup, null);

      assert.equal(response.screenMessage.indexOf('ScreenMessage 0 for PatronID, Language 1') > -1, true);
      assert(response.screenMessage.length === 3);
      assert.equal(response.printLine.indexOf('Print Line 0 for PatronID, Language 1') > -1, true);
      assert(response.printLine.length === 3);
      assert.equal(response.sequence, 4);

      // const checksum = Message.getChecksum('24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});

describe('PatronEnableResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 patron enable response message', (done) => {
      const testResponse = '26              00119980723    111413AOInstitutionID for PatronID|AAPatronID|AEPatron Name|BLY|AFScreenMessage 0 for PatronID, Language 1|AFScreen Message 1 for PatronID, Language 1|AGPrint Line 0 for PatronID, Language 1|AY7AZ8EA6\r\n';
      const response = parseResponse(testResponse);

      // Patron status
      assert.equal(response.status.chargePrivilegesDenied, false);
      assert.equal(response.status.renewalPrivilegesDenied, false);
      assert.equal(response.status.recallPrivilegesDenied, false);
      assert.equal(response.status.holdPrivilegesDenied, false);
      assert.equal(response.status.cardReportedLost, false);
      assert.equal(response.status.tooManyItemsCharged, false);
      assert.equal(response.status.tooManyItemsOverdue, false);
      assert.equal(response.status.tooManyRenewals, false);
      assert.equal(response.status.tooManyClaimsOfItemsReturned, false);
      assert.equal(response.status.tooManyItemsLost, false);
      assert.equal(response.status.excessiveOutstandingFines, false);
      assert.equal(response.status.excessiveOutstandingFees, false);
      assert.equal(response.status.recallOverdue, false);
      assert.equal(response.status.tooManyItemsBilled, false);
      assert.equal(response.status.renewalPrivilegedDenied, false);

      assert.equal(response.language, 'english');
      assert.equal(response.transactionDate, 'Thu Jul 23 1998 11:14:13 GMT+0000 (UTC)');
      assert.equal(response.patronIdentifier, 'PatronID');
      assert.equal(response.personalName, 'Patron Name');
      assert.equal(response.feeAmount, null);
      assert.equal(response.screenMessage.indexOf('Screen Message 1 for PatronID, Language 1') > -1, true);
      assert.equal(response.printLine.indexOf('Print Line 0 for PatronID, Language 1') > -1, true);
      assert.equal(response.sequence, 7);

      // const checksum = Message.getChecksum('24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});

describe('ItemInformationResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 item information response message', (done) => {
      const testResponse = '1808000119980723    115615CF00000|ABItemBook|AJTitle For Item Book|CK003|AQPermanent Location for ItemBook, Language 1|APCurrent Location ItemBook|CHFree-form text with new item property|AY0AZC05B\r\n';
      const response = parseResponse(testResponse);

      assert.equal(response.circulationStatus, '08');
      assert.equal(response.securityMarker, '00');
      assert.equal(response.feeType, '01');
      assert.equal(response.transactionDate, 'Thu Jul 23 1998 11:56:15 GMT+0000 (UTC)');

      assert.equal(response.holdQueueLength, '00000');
      assert.equal(response.dueDate, null);
      assert.equal(response.recallDate, null);
      assert.equal(response.holdPickupDate, null);

      assert.equal(response.itemIdentifier, 'ItemBook');
      assert.equal(response.titleIdentifier, 'Title For Item Book');

      assert.equal(response.owner, null);

      assert.equal(response.permanentLocation, 'Permanent Location for ItemBook, Language 1');
      assert.equal(response.currentLocation, 'Current Location ItemBook');
      assert.equal(response.itemProperties, 'Free-form text with new item property');

      assert.equal(response.screenMessage, null);
      assert.equal(response.printLine, null);
      assert.equal(response.sequence, 0);

      // const checksum = Message.getChecksum('24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});

describe('CheckoutResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 checkout response message', (done) => {
      const testResponse = '120NNY19960212    100514AO|AA104000000105|AB000000000005792|AJ|AH|AFItem cannot be charged : see help desk|AGItem can not be charged : see help desk|AY3AZD2A1\r\n';
      const response = parseResponse(testResponse);

      assert.equal(response.ok, false);
      assert.equal(response.renewalOk, false);

      assert.equal(response.magneticMediaSupported, false);
      assert.equal(response.magneticMedia, false);

      assert.equal(response.desensitizeSupported, false);
      assert.equal(response.desensitize, true);

      assert.equal(response.transactionDate, 'Mon Feb 12 1996 10:05:14 GMT+0000 (UTC)');

      assert.equal(response.institutionId, '');
      assert.equal(response.patronIdentifier, '104000000105');
      assert.equal(response.itemIdentifier, '000000000005792');
      assert.equal(response.titleIdentifier, '');
      assert.equal(response.dueDate, '');

      assert.equal(response.feeAmount, null);

      assert.equal(response.itemProperties, null);
      assert.equal(response.transactionId, null);

      assert.equal(response.screenMessage.indexOf('Item cannot be charged : see help desk') > -1, true);
      assert.equal(response.printLine.indexOf('Item can not be charged : see help desk') > -1, true);
      assert.equal(response.sequence, 3);

      // const checksum = Message.getChecksum('24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});

describe('CheckinResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 checkin response message', (done) => {
      const testResponse = '101YNN19980821    085721AOCertification Institute ID|ABCheckInBook|AQPermanent Location for CheckinBook, Language 1|AJTitle For CheckinBook|AAGoodPatron1|CK001|CHCheckinBook Properties|CLsort bin A1|AFScreen Message for CheckInBook|AGPrint Line for CheckInBook|AY2AZA3FF\r\n';
      const response = parseResponse(testResponse);

      assert.equal(response.ok, true);
      assert.equal(response.renewalOk, true);

      assert.equal(response.magneticMediaSupported, false);
      assert.equal(response.magneticMedia, false);

      assert.equal(response.transactionDate, 'Fri Aug 21 1998 08:57:21 GMT+0000 (UTC)');

      assert.equal(response.institutionId, 'Certification Institute ID');
      assert.equal(response.patronIdentifier, 'GoodPatron1');
      assert.equal(response.itemIdentifier, 'CheckInBook');
      assert.equal(response.titleIdentifier, 'Title For CheckinBook');
      assert.equal(response.dueDate, null);

      assert.equal(response.feeAmount, null);

      assert.equal(response.itemProperties, 'CheckinBook Properties');
      assert.equal(response.transactionId, null);

      assert.equal(response.screenMessage.indexOf('Screen Message for CheckInBook') > -1, true);
      assert.equal(response.printLine.indexOf('Print Line for CheckInBook') > -1, true);
      assert.equal(response.sequence, 2);

      // const checksum = Message.getChecksum('24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});

describe('FeePaidResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 fee paid response message', (done) => {
      const testResponse = '38Y19980723    111035AOInstitutionID for PatronID|AAPatronID|AFScreenMessage 0 for PatronID, Language 1|AGPrint Line 0 for PatronID, Language 1|AY6AZ9716\r\n';
      const response = parseResponse(testResponse);

      assert.equal(response.paymentAccepted, true);
      assert.equal(response.transactionDate, 'Thu Jul 23 1998 11:10:35 GMT+0000 (UTC)');

      assert.equal(response.institutionId, 'InstitutionID for PatronID');
      assert.equal(response.patronIdentifier, 'PatronID');

      assert.equal(response.transactionId, null);

      assert.equal(response.screenMessage.indexOf('ScreenMessage 0 for PatronID, Language 1') > -1, true);
      assert.equal(response.printLine.indexOf('Print Line 0 for PatronID, Language 1') > -1, true);
      assert.equal(response.sequence, 6);

      // const checksum = Message.getChecksum('24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});

describe('EndSessionResponse', () => {
  describe('#parse', () => {
    it('should parse a SIP2 end session response message', (done) => {
      const testResponse = '36Y19980723    110658AOInstitutionID for PatronID|AAPatronID|AFScreenMessage 0 for PatronID, Language 1|AFScreen Message 1 for PatronID, Language 1|AFScreen Message 2 for PatronID, Language 1|AGPrint Line 0 for PatronID, Language 1|AGPrint Line 1 for PatronID, Language 1|AGPrint Line 2 for PatronID, language 1|AY5AZ970F\r\n';
      const response = parseResponse(testResponse);

      assert.equal(response.endSession, true);
      assert.equal(response.transactionDate, 'Thu Jul 23 1998 11:06:58 GMT+0000 (UTC)');

      assert.equal(response.institutionId, 'InstitutionID for PatronID');
      assert.equal(response.patronIdentifier, 'PatronID');

      assert.equal(response.transactionId, null);

      assert.equal(response.screenMessage.length, 3);
      assert.equal(response.screenMessage.indexOf('ScreenMessage 0 for PatronID, Language 1') > -1, true);
      assert.equal(response.printLine.length, 3);
      assert.equal(response.printLine.indexOf('Print Line 0 for PatronID, Language 1') > -1, true);
      assert.equal(response.sequence, 5);

      // const checksum = Message.getChecksum('24              00119960212    100239AO|AA104000000105|AEJohn Doe|AFScreen Message|AGCheck Print message|AY2AZ');
      // assert.equal(response.checksum, checksum);

      done();
    });
  });
});
