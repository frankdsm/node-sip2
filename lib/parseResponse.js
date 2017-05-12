'use strict';

const CheckinResponse = require('./responses/Checkin');
const CheckoutResponse = require('./responses/Checkout');
const EndSessionResponse = require('./responses/EndSession');
const FeePaidResponse = require('./responses/FeePaid');
// const HoldResponse = require('./responses/Hold');
const ItemInformationResponse = require('./responses/ItemInformation');
// const ItemStatusResponse = require('./responses/ItemStatus');
const LoginResponse = require('./responses/Login');
const PatronEnableResponse = require('./responses/PatronEnable');
const PatronInformationResponse = require('./responses/PatronInformation');
const PatronStatusResponse = require('./responses/PatronStatus');
// const RenewAllResponse = require('./responses/RenewAll');
// const RenewResponseResponse = require('./responses/RenewResponse');
// const ResponseResponse = require('./responses/Response');
const ACStatusResponse = require('./responses/ACStatus');

function parse(message) {
  if (message === null) {
    throw new Error('Invalid SIP2 response: response is null.');
  }

  if (message.length < 2) {
    throw new Error('Invalid SIP2 response: response message is too short.');
  }

  const identifier = message.substring(0, 2);
  if (identifier === '94') {
    const parser = new LoginResponse();
    return parser.parse(message);
  }
  if (identifier === '98') {
    const parser = new ACStatusResponse();
    return parser.parse(message);
  }
  if (identifier === '24') {
    const parser = new PatronStatusResponse();
    return parser.parse(message);
  }
  if (identifier === '64') {
    const parser = new PatronInformationResponse();
    return parser.parse(message);
  }
  if (identifier === '26') {
    const parser = new PatronEnableResponse();
    return parser.parse(message);
  }
  if (identifier === '18') {
    const parser = new ItemInformationResponse();
    return parser.parse(message);
  }
  if (identifier === '12') {
    const parser = new CheckoutResponse();
    return parser.parse(message);
  }
  if (identifier === '10') {
    const parser = new CheckinResponse();
    return parser.parse(message);
  }
  if (identifier === '38') {
    const parser = new FeePaidResponse();
    return parser.parse(message);
  }
  if (identifier === '36') {
    const parser = new EndSessionResponse();
    return parser.parse(message);
  }
  throw new Error('Unsupported identifier: ' + identifier);
}

module.exports = parse;
