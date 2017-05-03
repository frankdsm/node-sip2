'use strict';

const POSITIONS = {
  hold: 0,
  overdue: 1,
  charged: 2,
  fine: 3,
  recall: 4,
  unavailable: 5,
};

class Summary {
  constructor(type) {
    this.summary = '          ';
    if (POSITIONS.hasOwnProperty(type)) {
      this.position = POSITIONS[type];
      this.summary = Summary.replaceAt(this.summary, this.position, 'Y');
    }
  }

  static replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

  toString() {
    return this.summary;
  }
}

module.exports = Summary;
