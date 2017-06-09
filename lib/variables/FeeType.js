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
  const values = Object.keys(FeeType).map(key => FeeType[key]);
  if (values.indexOf(value) !== -1) {
    return value;
  }
  return null;
};

module.exports = Object.freeze(FeeType);
