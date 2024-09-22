import filter2SQL from '../libs/filter2sql';
import Op from '../libs/operators';
import SQLiteOptions from '../libs/sqlite_options';

class SQLite {
  db = null;

  constructor(db) {
    this.db = db;
  }

  async init() {
    await this.createTableIfNotExists();
  }

  debug(...args) {
    console.log(...args);
  }

  arrangeDataToSave(row) {
    return {...row};
  }

  arrangeLoadedData(row) {
    return {...row};
  }

  async createTableIfNotExists() {
    const columns = [];
    for (const name in this.columns) {
      const column = this.columns[name];
      let definition = `"${name}" ${column.type}`;
      
      if (column.primaryKey) {
        definition += ' PRIMARY KEY';
      }
      
      if (column.allowNull === false) {
        definition += ' NOT NULL';
      }

      columns.push(definition);
    }

    const sql = `CREATE TABLE IF NOT EXISTS "${this.tableName}" (${columns.join(',')});`;
    await this.db.execAsync(sql);
  }

  async dropTable() {
    const sql = `DROP TABLE IF EXISTS "${this.tableName}";`
    await this.db.execAsync(sql);
  }

  async create(data) {
    const columns = [],
      questions = [],
      values = [];
    data = this.arrangeDataToSave(data);
    for (const c in data) {
      columns.push(c);
      questions.push('?');
      values.push(data[c]);
    }

    if (!columns.length) {
      throw new Error('No data to create');
    }

    const sql = `INSERT INTO "${this.tableName}" ("${columns.join('","')}") VALUES (${questions.join(',')})`;

    this.debug(sql, values);

    const result = await this.db.runAsync(sql, ...values);

    if (this.columnId) {
      data[this.columnId] = result.lastInsertRowId;
    }

    return data;
  }

  getWhereFromFilters(filters) {
    if (!filters) {
      return [];
    }

    const keys = Object.keys(filters);
    const symbols = Object.getOwnPropertySymbols(filters);
    if ((keys.length + symbols.length) > 1) {
      let filtersLits = [];
      for (const k of keys) {
        filtersLits.push({[k]: filters[k]});
      }

      for (const s of symbols) {
        filtersLits.push({[s]: filters[s]});
      }

      filters = {[Op.and]: filtersLits};
    }

    const [sql, ...params] = filter2SQL(filters, SQLiteOptions);

    return ['WHERE ' + sql, ...params];
  }

  async getList(options) {
    const sqlOptions = [],
      values = [];

    if (options) {
      if (options.filters || options.where) {
        const [where, ...whereValues] = this.getWhereFromFilters(
          {...options.filters, ...options.where}
        );
        if (where) {
          sqlOptions.push(where);
          values.push(...whereValues);
        }
      }
  
      if (options.orderBy) {
        const orderByList = [];
        for (let orderBy of options.orderBy) {
          if (Array.isArray(orderBy)) {
            if (orderBy.length > 1) {
              orderBy = orderBy[0] + ' ' + orderBy[1];
            } else {
              orderBy = orderBy = orderBy[0] + ' ASC';
            }
          }

          orderByList.push(orderBy);
        }

        sqlOptions.push(`ORDER BY ${orderByList.join(',')}`);
      }

      if (options.limit) {
        sqlOptions.push(`LIMIT ${options.limit}`);
      }

      if (options.offset) {
        sqlOptions.push(`OFFSET ${options.limit}`);
      }
    }

    let sql = `SELECT * FROM "${this.tableName}"`;
    if (sqlOptions.length) {
      sql += ' ' + sqlOptions.join(' ');
    }
      
    this.debug(sql, values);

    let list = await this.db.getAllAsync(sql, ...values);
    list = list.map(this.arrangeLoadedData);
    return list;
  }

  async getListFor(filters, options) {
    return this.getList({...options, filters})
  }

  async getSingleOrNullFor(filters, options) {
    const list = await this.getListFor(filters, options);
    if (!list?.length) {
      return;
    }

    if (list.length > 1) {
      throw new Error('There are many rows');
    }

    return list[0];
  }

  async updateFor(filters, data) {
    const set = [],
      values = [];
    for (const c in data) {
      set.push(`"${c}"=?`);
      values.push(data[c]);
    }

    const [where, ...whereValues] = this.getWhereFromFilters(filters);
    const sql = `UPDATE "${this.tableName}" SET ${set.join(',')} ${where}`,
      allValues = [...values, ...whereValues];

    this.debug(sql, allValues);

    const result = await this.db.runAsync(sql, allValues);
   
    return result.changes;
  }

  async deleteFor(filters) {
    const [where, ...whereValues] = this.getWhereFromFilters(filters);

    const sql = `DELETE FROM "${this.tableName}" ${where}`;
   
    this.debug(sql, whereValues);

    const result = await this.db.runAsync(sql, ...whereValues);
   
    return result.changes;
  }
};

export default SQLite;