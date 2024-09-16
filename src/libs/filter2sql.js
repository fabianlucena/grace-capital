import Op from './operators';

export default filter2SQL;

function filter2SQL(filter, options) {
  if (typeof filter === 'undefined'
    || filter === null
  ) {
    return ['NULL'];
  }

  if (options?.dateConvert && filter instanceof Date) {
    filter = options.dateConvert(filter);
  }

  if (typeof filter === 'string'
    || typeof filter === 'number'
    || filter instanceof Date
    || filter instanceof String
    || filter instanceof Number
    || filter instanceof Boolean
  ) {
    return ['?', filter];
  }

  const symbols = Object.getOwnPropertySymbols(filter),
    keys = Object.keys(filter),
    total = symbols.length + keys.length;
  if (total > 1) {
    console.error(filter);
    throw Error('Invalid filter, multiple properties in filter.');
  } else if (!total) {
    console.error(filter);
    throw Error('Invalid filter, no properties in filter.');
  }

  if (keys.length) {
    let key = keys[0],
      value = filter[key];
    if (value === null) {
      return [`${key} IS NULL`];
    }

    let [query, ...thisValues] = filter2SQL(value, options);
    if (query === '?') {
      query = '=?';
    }

    if (options.col) {
      key = options.col(key);
    }

    return [`${key}${query}`, ...thisValues];
  }

  if (!symbols.length) {
    console.error(filter);
    throw Error('Invalid filter, expected value or operand.');
  }

  const symbol = symbols[0],
    value1 = filter[symbol];

  switch(symbol) {
    case Op.col:  return filter2SQL_col(value1, options);
    case Op.eq:   return filter2SQL_eq(value1, options);
    case Op.and:  return filter2SQL_and(value1, options);
    case Op.or:   return filter2SQL_or(value1, options);
    case Op.ge:   return filter2SQL_ge(value1, options);
    case Op.le:   return filter2SQL_le(value1, options);
    case Op.date: return filter2SQL_date(value1, options);
    default: {
      console.error(filter);
      throw Error(`Invalid filter, unknown operator: ${symbol.toString()}.`);
    }
  }
}

function filter2SQL_col(value1, options) {
  if (typeof value1 !== 'string') {
    throw Error('Invalid filter, Symbol(eq) requires string.');
  }

  if (options.col) {
    value1 = options.col(value1);
  }

  return [value1];
}

function filter2SQL_eq(operand, options) {
  if (Array.isArray(operand)) {
    if (operand.length != 2) {
      throw Error('Invalid filter, Symbol(eq) requires a list of two operands.');
    }

    const 
      [query1, ...values1] = filter2SQL(operand[0], options),
      [query2, ...values2] = filter2SQL(operand[1], options);
    
    return [`${query1}=${query2}`, ...values1, ...values2];
  }
  
  const [query, ...value] = filter2SQL(operand, options);
  return [`=${query}`, ...value];
}

function filter2SQL_and(operand, options) {
  const queries = [],
    values = [];
  for (const key in operand) {
    const [query, ...thisValues] = filter2SQL(operand[key], options);
    queries.push(query);
    if (thisValues) {
      values.push(...thisValues);
    }
  }

  return ['((' + queries.join(') AND (') + '))', ...values];
}

function filter2SQL_or(operand, options) {
  const queries = [],
    values = [];
  for (const key in operand) {
    const [query, ...thisValues] = filter2SQL(operand[key], options);
    queries.push(query);
    if (thisValues) {
      values.push(...thisValues);
    }
  }

  return ['((' + queries.join(') OR (') + '))', ...values];
}

function filter2SQL_ge(value1, options) {
  const [query, ...value] = filter2SQL(value1, options);
  return [`>=${query}`, ...value];
}

function filter2SQL_le(value1, options) {
  const [query, ...value] = filter2SQL(value1, options);
  return [`<=${query}`, ...value];
}

function filter2SQL_date(value1, options) {
  let [query, ...args] = filter2SQL(value1, options);
  return options.date(query, ...args);
}
