'use strict';

const assert = require('assert');

// Messages
const Message = require('../lib/Message');
const Login = require('../lib/requests/Login');
const SCStatus = require('../lib/requests/SCStatus');
const RequestResend = require('../lib/requests/RequestResend');
const PatronStatus = require('../lib/requests/PatronStatus');
const PatronInformation = require('../lib/requests/PatronInformation');
const BlockPatron = require('../lib/requests/BlockPatron');
const PatronEnable = require('../lib/requests/PatronEnable');
const ItemInformation = require('../lib/requests/ItemInformation');
const Checkout = require('../lib/requests/Checkout');
const Checkin = require('../lib/requests/Checkin');
const FeePaid = require('../lib/requests/FeePaid');
const EndPatronSession = require('../lib/requests/EndPatronSession');

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
      const loginRequest = new Login(loginUserId, loginPassword, locationCode);
      loginRequest.sequence = 5;
      const testResponse = '9300CNLoginUserID|COLoginPassword|CPLocationCode|AY5AZEC7B\r\n';
      assert.equal(loginRequest.getMessage(), testResponse);
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
      const scStatusRequest = new SCStatus(status, maxPrintWidth, protocolVersion);
      scStatusRequest.sequence = 1;
      const testResponse = '990401.00|AY1AZFC59\r\n';
      assert.equal(scStatusRequest.getMessage(), testResponse);
      done();
    });
  });
});

describe('RequestResend', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 request resend message', (done) => {
      const requestResendRequest = new RequestResend();
      requestResendRequest.sequence = 1;
      requestResendRequest.errorDetection = false;
      const testResponse = '97\r\n';
      assert.equal(requestResendRequest.getMessage(), testResponse);
      done();
    });
  });
});

describe('PatronStatus', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 patron status message', (done) => {
      const patronStatusRequest = new PatronStatus();
      patronStatusRequest.sequence = 2;
      patronStatusRequest.institutionId = 'id_21';
      patronStatusRequest.patronIdentifier = '104000000105';
      patronStatusRequest.transactionDate = Message.getDateTime(new Date(1996, 1, 12, 10, 2, 39));
      const testResponse = '2300119960212    100239AOid_21|AA104000000105|AC|AD|AY2AZF271\r\n';
      assert.equal(patronStatusRequest.getMessage(), testResponse);
      done();
    });
  });
});

describe('PatronInformation', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 patron information message', (done) => {
      const type = 'hold';
      const patronInformationRequest = new PatronInformation(type, 1, 5);
      patronInformationRequest.sequence = 1;
      patronInformationRequest.institutionId = 'InstitutionID';
      patronInformationRequest.patronIdentifier = 'PatronID';
      patronInformationRequest.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 9, 19, 5));
      const testResponse = '6300119980723    091905Y         AOInstitutionID|AAPatronID|BP00001|BQ00005|AY1AZEA83\r\n';
      assert.equal(patronInformationRequest.getMessage(), testResponse);
      done();
    });
  });
});

describe('BlockPatron', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 block patron message', (done) => {
      const cardRetained = false;
      const blockedCardResponse = 'CARD BLOCK TEST';
      const blockPatronRequest = new BlockPatron(cardRetained, blockedCardResponse);
      blockPatronRequest.patronIdentifier = '104000000705';
      blockPatronRequest.sequence = 2;
      blockPatronRequest.transactionDate = Message.getDateTime(new Date(1996, 1, 13, 16, 23, 52));
      const testResponse = '01N19960213    162352AO|ALCARD BLOCK TEST|AA104000000705|AC|AY2AZF02F\r\n';
      assert.equal(blockPatronRequest.getMessage(), testResponse);
      done();
    });
  });
});

describe('PatronEnable', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 item information message', (done) => {
      const patronEnableRequest = new PatronEnable();
      patronEnableRequest.sequence = 4;
      patronEnableRequest.institutionId = 'Certification Institute ID';
      patronEnableRequest.patronIdentifier = 'PatronID';
      patronEnableRequest.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 9, 42, 40));
      const testResponse = '2519980723    094240AOCertification Institute ID|AAPatronID|AY4AZEBF1\r\n';
      assert.equal(patronEnableRequest.getMessage(), testResponse);
      done();
    });
  });
});

describe('ItemInformation', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 item information message', (done) => {
      const itemIdentifier = 'ItemBook';
      const itemInformationRequest = new ItemInformation(itemIdentifier);
      itemInformationRequest.sequence = 1;
      itemInformationRequest.institutionId = 'Certification Institute ID';
      itemInformationRequest.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 10, 0, 0));
      const testResponse = '1719980723    100000AOCertification Institute ID|ABItemBook|AY1AZEBEB\r\n';
      assert.equal(itemInformationRequest.getMessage(), testResponse);
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
      const checkoutRequest = new Checkout(scRenewalPolicy, nbDueDate, itemIdentifier);
      checkoutRequest.patronIdentifier = '104000000105';
      checkoutRequest.sequence = 3;
      checkoutRequest.transactionDate = Message.getDateTime(new Date(1996, 1, 12, 10, 5, 14));
      const testResponse = '11YN19960212    10051419960212    100514AO|AA104000000105|AB000000000005792|AC|AY3AZEDC2\r\n';
      assert.equal(checkoutRequest.getMessage(), testResponse);
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
      const checkinRequest = new Checkin(returnDate, location, itemIdentifier);
      checkinRequest.institutionId = 'Certification Institute ID';
      checkinRequest.terminalPassword = 'TPWord';
      checkinRequest.sequence = 2;
      checkinRequest.cancel = false;
      checkinRequest.transactionDate = Message.getDateTime(new Date(1998, 7, 21, 8, 57, 21));
      const testResponse = '09N19980821    085721                  APCertification Terminal Location|AOCertification Institute ID|ABCheckInBook|ACTPWord|BIN|AY2AZD6A5\r\n';
      assert.equal(checkinRequest.getMessage(), testResponse);
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

      const feeTypeRequest = new FeePaid(feeType, paymentType, currencyType, feeAmount, feeIdentifier, transactionId);
      feeTypeRequest.sequence = 2;
      feeTypeRequest.institutionId = institutionId;
      feeTypeRequest.patronIdentifier = patronIdentifier;
      feeTypeRequest.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 9, 32, 11));
      const testResponse = '3719980723    0932110401USDBV111.11|AOCertification Institute ID|AAPatronID|BKTransactionID|AY2AZE1EF\r\n';
      assert.equal(feeTypeRequest.getMessage(), testResponse);
      done();
    });
  });
});

describe('EndPatronSession', () => {
  describe('#getMessage', () => {
    it('should build a SIP2 end patron session message', (done) => {
      const endPatronSessionRequest = new EndPatronSession();
      endPatronSessionRequest.sequence = 3;
      endPatronSessionRequest.institutionId = 'Certification Institute ID';
      endPatronSessionRequest.patronIdentifier = 'PatronID';
      endPatronSessionRequest.transactionDate = Message.getDateTime(new Date(1998, 6, 23, 9, 40, 14));
      const testResponse = '3519980723    094014AOCertification Institute ID|AAPatronID|AY3AZEBF2\r\n';
      assert.equal(endPatronSessionRequest.getMessage(), testResponse);
      done();
    });
  });
});
