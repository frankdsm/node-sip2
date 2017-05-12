'use strict';

const FeeType = {
  OTHER_UNKNOWN: '01',
  ADMINISTRATIVE: '02',
  DAMAGE: '03',
  OVERDUE: '04',
  PROCESSING: '05',
  RENTAL: '06',
  REPLACEMENT: '07',
  COMPUTER_ACCESS_CHARGE: '08',
  HOLD_FEE: '09',
};

FeeType.parse = function onParse(value) {
  if (value === '01') {
    return FeeType.OTHER_UNKNOWN;
  } else if (value === '02') {
    return FeeType.ADMINISTRATIVE;
  } else if (value === '03') {
    return FeeType.DAMAGE;
  } else if (value === '04') {
    return FeeType.OVERDUE;
  } else if (value === '05') {
    return FeeType.PROCESSING;
  } else if (value === '06') {
    return FeeType.RENTAL;
  } else if (value === '07') {
    return FeeType.REPLACEMENT;
  } else if (value === '08') {
    return FeeType.COMPUTER_ACCESS_CHARGE;
  }
  return null;
};

module.exports = Object.freeze(FeeType);
