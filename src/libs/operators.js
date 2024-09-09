const Op = {
  and: Symbol('and'),
  or:  Symbol('or'),
  ge:  Symbol('ge'),
  le:  Symbol('le'),
  applyFilterToData,
};

export default Op;

function applyFilterToData(filter, data, value2) {
  if (typeof filter === 'undefined') {
    filter = null;
  }

  if (typeof filter === 'string'
    || filter instanceof Date
    || filter instanceof String
    || filter instanceof Number
    || filter instanceof Boolean
    || filter === null
  ) {
    if (typeof value2 !== 'undefined') {
      return filter === value2;
    }

    return filter;
  }

  if (Array.isArray(filter)) {
    throw Error('Invalid filter, array is not allowed.');
  }

  const symbols = Object.getOwnPropertySymbols(filter),
    keys = Object.keys(filter),
    total = symbols.length + keys.length;
  if (total > 1) {
    throw Error('Invalid filter, multiple properties in filter.');
  } else if (!total) {
    throw Error('Invalid filter, no properties in filter.');
  }

  if (keys.length) {
    if (typeof value !== 'undefined') {
      throw Error('Invalid filter, unexpected value.');
    }

    const key = keys[0],
      value1 = filter[key];
      value2 = data[key] ?? null;

    return applyFilterToData(value1, data, value2);
  }

  if (!symbols.length) {
    throw Error('Invalid filter, expected value or operand.');
  }

  const symbol = symbols[0],
    value1 = filter[symbol];

  switch(symbol) {
    case Op.and: return applyFilterToData_and(value1, data);
    case Op.or:  return applyFilterToData_or(value1, data);
    case Op.ge:  return applyFilterToData_ge(value1, data, value2);
    case Op.le:  return applyFilterToData_le(value1, data, value2);
    default: {
      console.error(filter);
      throw Error('Invalid filter, unknown operator.');
    }
  }
}

function applyFilterToData_and(operand, data) {
  let value;
  for (const key in operand) {
    value = applyFilterToData(operand[key], data);
    if (!value) {
      break;
    }
  }

  return value;
}

function applyFilterToData_or(operand, data) {
  let value;
  for (const key in operand) {
    value = applyFilterToData(operand[key], data);
    if (value) {
      break;
    }
  }

  return value;
}

function applyFilterToData_ge(value1, data, value2) {
  let effectiveValue1 = applyFilterToData(value1, data),
    effectiveValue2 = value2;
  if (effectiveValue1 instanceof Date) {
    effectiveValue1 = effectiveValue1.getTime();
  }
  if (effectiveValue2 instanceof Date) {
    effectiveValue2 = effectiveValue2.getTime();
  }

  return effectiveValue1 >= effectiveValue2;
}

function applyFilterToData_le(value1, data, value2) {
  let effectiveValue1 = applyFilterToData(value1, data),
    effectiveValue2 = value2;
  if (effectiveValue1 instanceof Date) {
    effectiveValue1 = effectiveValue1.getTime();
  }
  if (effectiveValue2 instanceof Date) {
    effectiveValue2 = effectiveValue2.getTime();
  }

  return effectiveValue1 <= effectiveValue2;
}