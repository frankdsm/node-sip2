'use strict';

const assert = require('assert');

// Messages
const Message = require('../lib/Message');
const Login = require('../lib/messages/Login');
const SCStatus = require('../lib/messages/SCStatus');
const RequestResend = require('../lib/messages/RequestResend');
const PatronStatus = require('../lib/messages/PatronStatus');
const PatronInformation = require('../lib/messages/PatronInformation');
const BlockPatron = require('../lib/messages/BlockPatron');
const PatronEnable = require('../lib/messages/PatronEnable');
const ItemInformation = require('../lib/messages/ItemInformation');
const Checkout = require('../lib/messages/Checkout');
const Checkin = require('../lib/messages/Checkin');
const FeePaid = require('../lib/messages/FeePaid');
const EndPatronSession = require('../lib/messages/EndPatronSession');

// Variables
const FeeType = require('../lib/variables/FeeType');
const CurrencyType = require('../lib/variables/CurrencyType');
const PaymentType = require('../lib/variables/PaymentType');
const StatusCode = require('../lib/variables/StatusCode');

describe('Login', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 login message', (done) => {
      const loginUserId = 'LoginUserID';
      const loginPassword = 'LoginPassword';
      const locationCode = 'LocationCode';
      const loginMessage = new Login(loginUserId, loginPassword, locationCode);
      loginMessage.sequence = 5;
      const testMessage = '9300CNLoginUserID|COLoginPassword|CPLocationCode|AY5AZEC7B\r\n';
      assert.equal(loginMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('SCStatus', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 SC status message', (done) => {
      const status = StatusCode.OK;
      const maxPrintWidth = '40';
      const protocolVersion = '1.00';
      const scStatusMessage = new SCStatus(status, maxPrintWidth, protocolVersion);
      scStatusMessage.sequence = 1;
      const testMessage = '990401.00|AY1AZFC59\r\n';
      assert.equal(scStatusMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('RequestResend', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 request resend message', (done) => {
      const requestResendMessage = new RequestResend();
      requestResendMessage.sequence = 1;
      requestResendMessage.errorDetection = false;
      const testMessage = '97\r\n';
      assert.equal(requestResendMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('PatronStatus', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 patron status message', (done) => {
      const patronStatusMessage = new PatronStatus();
      patronStatusMessage.sequence = 2;
      patronStatusMessage.institutionId = 'id_21';
      patronStatusMessage.patronIdentifier = '104000000105';
      patronStatusMessage.transactionDate = Message.getDateTime(new Date(1996, 1, 12, 10, 2, 39));
      const testMessage = '2300119960212    100239AOid_21|AA104000000105|AC|AD|AY2AZF271\r\n';
      assert.equal(patronStatusMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('PatronInformation', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 patron information message', (done) => {
      const type = 'hold';
      const patronInformationMessage = new PatronInformation(type, 1, 5);
      patronInformationMessage.sequence = 1;
      patronInformationMessage.institutionId = 'InstitutionID';
      patronInformationMessage.patronIdentifier = 'PatronID';
      patronInformationMessage.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 9, 19, 5));
      const testMessage = '6300119980723    091905Y         AOInstitutionID|AAPatronID|BP00001|BQ00005|AY1AZEA83\r\n';
      assert.equal(patronInformationMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('BlockPatron', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 block patron message', (done) => {
      const cardRetained = false;
      const blockedCardMessage = 'CARD BLOCK TEST';
      const blockPatronMessage = new BlockPatron(cardRetained, blockedCardMessage);
      blockPatronMessage.patronIdentifier = '104000000705';
      blockPatronMessage.sequence = 2;
      blockPatronMessage.transactionDate = Message.getDateTime(new Date(1996, 1, 13, 16, 23, 52));
      const testMessage = '01N19960213    162352AO|ALCARD BLOCK TEST|AA104000000705|AC|AY2AZF02F\r\n';
      assert.equal(blockPatronMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('PatronEnable', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 item information message', (done) => {
      const patronEnableMessage = new PatronEnable();
      patronEnableMessage.sequence = 4;
      patronEnableMessage.institutionId = 'Certification Institute ID';
      patronEnableMessage.patronIdentifier = 'PatronID';
      patronEnableMessage.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 9, 42, 40));
      const testMessage = '2519980723    094240AOCertification Institute ID|AAPatronID|AY4AZEBF1\r\n';
      assert.equal(patronEnableMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('ItemInformation', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 item information message', (done) => {
      const itemIdentifier = 'ItemBook';
      const itemInformationMessage = new ItemInformation(itemIdentifier);
      itemInformationMessage.sequence = 1;
      itemInformationMessage.institutionId = 'Certification Institute ID';
      itemInformationMessage.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 10, 0, 0));
      const testMessage = '1719980723    100000AOCertification Institute ID|ABItemBook|AY1AZEBEB\r\n';
      assert.equal(itemInformationMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('Checkout', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 checkout message', (done) => {
      const scRenewalPolicy = true;
      const nbDueDate = Message.getDateTime(new Date(1996, 1, 12, 10, 5, 14));
      const itemIdentifier = '000000000005792';
      const checkoutMessage = new Checkout(scRenewalPolicy, nbDueDate, itemIdentifier);
      checkoutMessage.patronIdentifier = '104000000105';
      checkoutMessage.sequence = 3;
      checkoutMessage.transactionDate = Message.getDateTime(new Date(1996, 1, 12, 10, 5, 14));
      const testMessage = '11YN19960212    10051419960212    100514AO|AA104000000105|AB000000000005792|AC|AY3AZEDC2\r\n';
      assert.equal(checkoutMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('Checkin', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 checkin message', (done) => {
      const returnDate = null;
      const location = 'Certification Terminal Location';
      const itemIdentifier = 'CheckInBook';
      const checkinMessage = new Checkin(returnDate, location, itemIdentifier);
      checkinMessage.institutionId = 'Certification Institute ID';
      checkinMessage.terminalPassword = 'TPWord';
      checkinMessage.sequence = 2;
      checkinMessage.cancel = false;
      checkinMessage.transactionDate = Message.getDateTime(new Date(1998, 7, 21, 8, 57, 21));
      const testMessage = '09N19980821    085721                  APCertification Terminal Location|AOCertification Institute ID|ABCheckInBook|ACTPWord|BIN|AY2AZD6A5\r\n';
      assert.equal(checkinMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('FeePaid', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 fee paid message', (done) => {
      const feeType = FeeType.OVERDUE;
      const paymentType = PaymentType.VISA;
      const currencyType = CurrencyType.US_DOLLAR;
      const feeAmount = '111.11';
      const feeIdentifier = false;
      const transactionId = 'TransactionID';
      const institutionId = 'Certification Institute ID';
      const patronIdentifier = 'PatronID';

      const feeTypeMessage = new FeePaid(feeType, paymentType, currencyType, feeAmount, feeIdentifier, transactionId);
      feeTypeMessage.sequence = 2;
      feeTypeMessage.institutionId = institutionId;
      feeTypeMessage.patronIdentifier = patronIdentifier;
      feeTypeMessage.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 9, 32, 11));
      const testMessage = '3719980723    0932110401USDBV111.11|AOCertification Institute ID|AAPatronID|BKTransactionID|AY2AZE1EF\r\n';
      assert.equal(feeTypeMessage.getMessage(), testMessage);
      done();
    });
  });
});

describe('EndPatronSession', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 end patron session message', (done) => {
      const endPatronSessionMessage = new EndPatronSession();
      endPatronSessionMessage.sequence = 3;
      endPatronSessionMessage.institutionId = 'Certification Institute ID';
      endPatronSessionMessage.patronIdentifier = 'PatronID';
      endPatronSessionMessage.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 9, 40, 14));
      const testMessage = '3519980723    094014AOCertification Institute ID|AAPatronID|AY3AZEBF2\r\n';
      assert.equal(endPatronSessionMessage.getMessage(), testMessage);
      done();
    });
  });
});
