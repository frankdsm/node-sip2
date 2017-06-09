'use strict';

const MediaType = {
  OTHER: '000',
  BOOK: '001',
  MAGAZINE: '002',
  BOUND_JOURNAL: '003',
  AUDIO_TAPE: '004',
  VIDEO_TAPE: '005',
  CD_CDROM: '006',
  DISKETTE: '007',
  BOOK_WITH_DISKETTE: '008',
  BOOK_WITH_CD: '009',
  BOOK_WITH_AUDIO_TAPE: '010',
};

MediaType.parse = function onParse(value) {
  const values = Object.keys(MediaType).map(key => MediaType[key]);
  if (values.indexOf(value) !== -1) {
    return value;
  }
  return null;
};

module.exports = Object.freeze(MediaType);
