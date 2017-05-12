'use strict';

const SecurityMarker = {
  OTHER: '00',
  NONE: '01',
  TATTLE_TAPE_SECURITY_STRIP_3M: '02',
  WHISPER_TAPE_3M: '03',
};

SecurityMarker.parse = function onParse(value) {
  if (value === '00') {
    return SecurityMarker.OTHER;
  } else if (value === '02') {
    return SecurityMarker.NONE;
  } else if (value === '03') {
    return SecurityMarker.TATTLE_TAPE_SECURITY_STRIP_3M;
  } else if (value === '04') {
    return SecurityMarker.WHISPER_TAPE_3M;
  }
  return null;
};

module.exports = Object.freeze(SecurityMarker);
