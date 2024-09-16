import Op from './operators';

export default execFilter;

function execFilter(filter, data, value2) {
  if (typeof filter === 'undefined') {
    filter = null;
  }

  if (filter instanceof Date) {
    filter = filter.getTime();
  }

  if (value2 instanceof Date) {
    value2 = value2.getTime();
  }

  if (typeof filter === 'string'
    || typeof filter === 'number'
    || filter instanceof Date
    || filter instanceof String
    || filter instanceof Number
    || filter instanceof Boolean
    || filter === null
  ) {
    if (typeof value2 !== 'undefined') {
      return filter == value2;
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
    if (typeof value2 !== 'undefined') {
      throw Error('Invalid filter, unexpected value.');
    }

    const key = keys[0],
      value1 = filter[key];
      value2 = data[key] ?? null;

    return execFilter(value1, data, value2);
  }

  if (!symbols.length) {
    throw Error('Invalid filter, expected value or operand.');
  }

  const symbol = symbols[0],
    value1 = filter[symbol];

  switch(symbol) {
    case Op.and: return execFilter_and(value1, data);
    case Op.or:  return execFilter_or(value1, data);
    case Op.ge:  return execFilter_ge(value1, data, value2);
    case Op.le:  return execFilter_le(value1, data, value2);
    default: {
      console.error(filter);
      throw Error('Invalid filter, unknown operator.');
    }
  }
}

function execFilter_and(operand, data) {
  let value;
  for (const key in operand) {
    value = execFilter(operand[key], data);
    if (!value) {
      break;
    }
  }

  return value;
}

function execFilter_or(operand, data) {
  let value;
  for (const key in operand) {
    value = execFilter(operand[key], data);
    if (value) {
      break;
    }
  }

  return value;
}

function execFilter_ge(value1, data, value2) {
  let effectiveValue1 = execFilter(value1, data),
    effectiveValue2 = value2;

  return effectiveValue1 >= effectiveValue2;
}

function execFilter_le(value1, data, value2) {
  let effectiveValue1 = execFilter(value1, data),
    effectiveValue2 = value2;

  return effectiveValue1 <= effectiveValue2;
}