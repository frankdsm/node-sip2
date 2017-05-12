'use strict';

const CirculationStatus = {
  INVALID__OR_UNKNOWN_ITEM_ID: '01',
  ON_ORDER: '02',
  AVAILABLE: '03',
  CHARGED: '04',
  CHARGED_NOT_TO_BE_RECALLED_UNTIL_EARLIEST_RECALL_DATE: '05',
  IN_PROCESS: '06',
  RECALLED: '07',
  WAITING_ON_HOLD_SHELF: '08',
  WAITING_TO_BE_RESHELVED: '09',
  IN_TRANSIT: '10',
  CLAIMED_RETURNED: '11',
  LOST: '12',
  MISSING: '13',
};

CirculationStatus.parse = function onParse(value) {
  if (value === '01') {
    return CirculationStatus.INVALID__OR_UNKNOWN_ITEM_ID;
  } else if (value === '02') {
    return CirculationStatus.ON_ORDER;
  } else if (value === '03') {
    return CirculationStatus.AVAILABLE;
  } else if (value === '04') {
    return CirculationStatus.CHARGED;
  } else if (value === '05') {
    return CirculationStatus.CHARGED_NOT_TO_BE_RECALLED_UNTIL_EARLIEST_RECALL_DATE;
  } else if (value === '06') {
    return CirculationStatus.IN_PROCESS;
  } else if (value === '07') {
    return CirculationStatus.RECALLED;
  } else if (value === '08') {
    return CirculationStatus.WAITING_ON_HOLD_SHELF;
  } else if (value === '09') {
    return CirculationStatus.WAITING_TO_BE_RESHELVED;
  } else if (value === '10') {
    return CirculationStatus.IN_TRANSIT;
  } else if (value === '11') {
    return CirculationStatus.CLAIMED_RETURNED;
  } else if (value === '12') {
    return CirculationStatus.LOST;
  } else if (value === '13') {
    return CirculationStatus.MISSING;
  }
  return null;
};

module.exports = Object.freeze(CirculationStatus);
