'use strict';

const SecurityMarker = {
  OTHER: '00',
  NONE: '01',
  TATTLE_TAPE_SECURITY_STRIP_3M: '02',
  WHISPER_TAPE_3M: '03',
};

SecurityMarker.parse = function onParse(value) {
  const values = Object.keys(SecurityMarker).map(key => SecurityMarker[key]);
  if (values.indexOf(value) !== -1) {
    return value;
  }
  return null;
};

module.exports = Object.freeze(SecurityMarker);
