const SQLiteOptions = {
  col: col => `"${col}"`,
  dateConvert: d => d.toISOString(),
  date: (date, ...value) => {
    const result = [`SUBSTRING(${date}, 1, INSTR(${date}, 'T')-1)`];
    result.push(...value, ...value);
    
    return result;
  },
};

export default SQLiteOptions;