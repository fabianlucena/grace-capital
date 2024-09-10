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
    console.log(filter);
    
    throw Error('Invalid filter, multiple properties in filter.');
  } else if (!total) {
    throw Error('Invalid filter, no properties in filter.');
  }

  if (keys.length) {
    const key = keys[0],
      value = filter[key];
    if (value === null) {
      return [`${key} IS NULL`];
    }

    const [query, ...thisValues] = filter2SQL(value, options);
    return [`${key}${query}`, ...thisValues];
  }

  if (!symbols.length) {
    throw Error('Invalid filter, expected value or operand.');
  }

  const symbol = symbols[0],
    value1 = filter[symbol];

  switch(symbol) {
    case Op.and: return filter2SQL_and(value1, options);
    case Op.or:  return filter2SQL_or(value1, options);
    case Op.ge:  return filter2SQL_ge(value1, options);
    case Op.le:  return filter2SQL_le(value1, options);
    default: {
      console.error(filter);
      throw Error(`Invalid filter, unknown operator: ${symbol.toString()}.`);
    }
  }
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