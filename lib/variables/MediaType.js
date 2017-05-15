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
  if (value === '000') {
    return MediaType.OTHER;
  } else if (value === '001') {
    return MediaType.BOOK;
  } else if (value === '002') {
    return MediaType.MAGAZINE;
  } else if (value === '003') {
    return MediaType.BOUND_JOURNAL;
  } else if (value === '004') {
    return MediaType.AUDIO_TAPE;
  } else if (value === '005') {
    return MediaType.VIDEO_TAPE;
  } else if (value === '006') {
    return MediaType.CD_CDROM;
  } else if (value === '007') {
    return MediaType.DISKETTE;
  } else if (value === '008') {
    return MediaType.BOOK_WITH_DISKETTE;
  } else if (value === '009') {
    return MediaType.BOOK_WITH_CD;
  } else if (value === '010') {
    return MediaType.BOOK_WITH_AUDIO_TAPE;
  }
  return null;
};

module.exports = Object.freeze(MediaType);
