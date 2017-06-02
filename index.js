'use strict';

const Connection = require('./lib/Connection');

// Requests
const LoginRequest = require('./lib/requests/Login');
const SCStatusRequest = require('./lib/requests/SCStatus');
const RequestResendRequest = require('./lib/requests/RequestResend');
const PatronStatusRequest = require('./lib/requests/PatronStatus');
const PatronInformationRequest = require('./lib/requests/PatronInformation');
const BlockPatronRequest = require('./lib/requests/BlockPatron');
const PatronEnableRequest = require('./lib/requests/PatronEnable');
const ItemInformationRequest = require('./lib/requests/ItemInformation');
const CheckoutRequest = require('./lib/requests/Checkout');
const CheckinRequest = require('./lib/requests/Checkin');
const FeePaidRequest = require('./lib/requests/FeePaid');
const EndPatronSessionRequest = require('./lib/requests/EndPatronSession');

// Responses
const CheckinResponse = require('./lib/responses/Checkin');
const CheckoutResponse = require('./lib/responses/Checkout');
const EndSessionResponse = require('./lib/responses/EndSession');
const FeePaidResponse = require('./lib/responses/FeePaid');
const ItemInformationResponse = require('./lib/responses/ItemInformation');
const LoginResponse = require('./lib/responses/Login');
const PatronEnableResponse = require('./lib/responses/PatronEnable');
const PatronInformationResponse = require('./lib/responses/PatronInformation');
const PatronStatusResponse = require('./lib/responses/PatronStatus');
const ACStatusResponse = require('./lib/responses/ACStatus');

// Variables
const CirculationStatus = require('./lib/variables/CirculationStatus');
const CurrencyType = require('./lib/variables/CurrencyType');
const FeeType = require('./lib/variables/FeeType');
const ItemType = require('./lib/variables/ItemType');
const Language = require('./lib/variables/Language');
const MediaType = require('./lib/variables/MediaType');
const PatronStatus = require('./lib/variables/PatronStatus');
const PaymentType = require('./lib/variables/PaymentType');
const SecurityMarker = require('./lib/variables/SecurityMarker');
const StatusCode = require('./lib/variables/StatusCode');
const Summary = require('./lib/variables/Summary');
const SupportedMessages = require('./lib/variables/SupportedMessages');


module.exports = {
  Connection,
  LoginRequest,
  SCStatusRequest,
  RequestResendRequest,
  PatronStatusRequest,
  PatronInformationRequest,
  BlockPatronRequest,
  PatronEnableRequest,
  ItemInformationRequest,
  CheckoutRequest,
  CheckinRequest,
  FeePaidRequest,
  EndPatronSessionRequest,
  CheckinResponse,
  CheckoutResponse,
  EndSessionResponse,
  FeePaidResponse,
  ItemInformationResponse,
  LoginResponse,
  PatronEnableResponse,
  PatronInformationResponse,
  PatronStatusResponse,
  ACStatusResponse,
  CirculationStatus,
  CurrencyType,
  FeeType,
  ItemType,
  Language,
  MediaType,
  PatronStatus,
  PaymentType,
  SecurityMarker,
  StatusCode,
  Summary,
  SupportedMessages,
};
