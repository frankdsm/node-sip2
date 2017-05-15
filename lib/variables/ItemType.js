'use strict';

const ItemType = {
  HOLD: 'AS',
  OVERDUE: 'AT',
  CHARGED: 'AU',
  FINE: 'AV',
  RECALL: 'BU',
  UNAVAILABLE_HOLD: 'CD',
};

module.exports = Object.freeze(ItemType);
