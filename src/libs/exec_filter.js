import Op from './operators';

export default execFilter;

function execFilter(filter, data, value2) {
  if (typeof filter === 'undefined') {
    filter = null;
  }

  if (filter instanceof Date) {
    filter = filter.toISOString();
  }

  if (value2 instanceof Date) {
    value2 = value2.toISOString();
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
    console.error(filter);
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
    case Op.col:  return execFilter_col(value1, data);
    case Op.eq:   return execFilter_eq(value1, data, value2);
    case Op.and:  return execFilter_and(value1, data);
    case Op.or:   return execFilter_or(value1, data);
    case Op.ge:   return execFilter_ge(value1, data, value2);
    case Op.le:   return execFilter_le(value1, data, value2);
    case Op.func: return execFilter_func(value1, data);
    case Op.date: return execFilter_date(value1, data);

    default: {
      console.error(filter);
      throw Error(`Invalid filter, unknown operator ${symbol.toString()}.`);
    }
  }
}

function execFilter_col(value1, data) {
  if (typeof value1 !== 'string') {
    throw Error('Invalid filter, Symbol(col) requires string.');
  }

  return data[value1];
}

function execFilter_eq(operand, data, value2) {
  if (Array.isArray(operand)) {
    if (operand.length != 2) {
      throw Error('Invalid filter, Symbol(eq) requires a list of two operands.');
    }

    if (typeof value2 !== 'undefined') {
      throw Error('Invalid filter, Symbol(eq) forbiden second argument when a two operands list is provided.');
    }
    
    const value1 = execFilter(operand[0], data);
    value2 = execFilter(operand[1], data);
    
    return value1 == value2;
  } else if (arguments.length < 2) {
    throw Error('Invalid filter, Symbol(eq) requires a two operands or a list of two operands.');
  }

  return operand == value2;
}

function execFilter_and(operand, data) {
  if (!Array.isArray(operand)) {
    throw Error('Invalid filter, Symbol(and) requires a operand list.');
  }

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
  if (!Array.isArray(operand)) {
    throw Error('Invalid filter, Symbol(or) requires a operand list.');
  }

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

const sqliteContext = {
  SUBSTRING: (text, from, length) => text.substr(from - 1, length),
  INSTR: (text, token) => ((text && token)? (text.search(token) + 1): null),
};

function runInContext(code, data) {
  const context = { ...sqliteContext, ...data},
    args = [],
    vals = [];

  for (const k in context) {
    args.push(k);
    vals.push(context[k]);
  }

  const func = new Function(...args, code);
  const result = func(...vals);

  return result;
}

function execFilter_func(code, data) {
  code = code.replace('=', '==');

  runInContext(code, data);
  
  return true;
}

function execFilter_date(value1, data) {
  let value = execFilter(value1, data);
  if (!value) {
    return value;
  }

  if (value instanceof Date) {
    value = value.toISOString();
  }
  
  return value.split('T')[0];
}