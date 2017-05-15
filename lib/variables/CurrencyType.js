'use strict';

const CurrencyType = {
  US_DOLLAR: 'USD',
  CANADIAN_DOLLAR: 'CAD',
  POUND_STERLING: 'GBP',
  YEN: 'JPY',
  EURO: 'EUR',
};

CurrencyType.parse = function onParse(value) {
  if (value === 'USA') {
    return CurrencyType.US_DOLLAR;
  } else if (value === 'CAD') {
    return CurrencyType.CANADIAN_DOLLAR;
  } else if (value === 'GBP') {
    return CurrencyType.POUND_STERLING;
  } else if (value === 'JPY') {
    return CurrencyType.YEN;
  } else if (value === 'EUR') {
    return CurrencyType.EURO;
  }
  return null;
};

module.exports = Object.freeze(CurrencyType);
