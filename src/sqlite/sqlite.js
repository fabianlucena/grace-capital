import filter2SQL from '../libs/filter2sql';
import Op from '../libs/operators';
import SQLiteOptions from '../libs/sqlite_options';

class SQLite {
  db = null;

  constructor(db) {
    this.db = db;
  }

  async init() {
    await this.createTable();
  }

  arrangeDataToSave(row) {
    return {...row};
  }

  arrangeLoadedData(row) {
    return {...row};
  }

  async createTable() {
    const columns = [];
    for (const name in this.columns) {
      const column = this.columns[name];
      let definition = `${name} ${column.type}`;
      
      if (column.primaryKey) {
        definition += ' PRIMARY KEY';
      }
      
      if (column.allowNull === false) {
        definition += ' NOT NULL';
      }

      columns.push(definition);
    }

    const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${columns.join(',')});`;
    await this.db.execAsync(sql);
  }

  async dropTable() {
    const sql = `DROP TABLE IF EXISTS ${this.tableName};`
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

    const sql = `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES (${questions.join(',')})`;

    console.log(sql, ...values);

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
    const [where, ...whereValues] = this.getWhereFromFilters(options?.filters),
      sql = `SELECT * FROM ${this.tableName} ${where ?? ''}`;
      
    console.log(sql, ...whereValues);

    let list = await this.db.getAllAsync(sql, ...whereValues);
    list = list.map(this.arrangeLoadedData);
    return list;
  }

  async getSingleOrNullFor(filters) {
    const list = await this.getListFor(filters);
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
      set.push(`${c}=?`);
      values.push(data[c]);
    }

    const [where, ...whereValues] = this.getWhereFromFilters(filters);
    const result = await this.db.runAsync(
      `UPDATE ${this.tableName} SET ${set.join(',')} ${where}`,
      ...values,
      ...whereValues,
    );
   
    return result.changes;
  }

  async deleteFor(filters) {
    const [where, ...whereValues] = this.getWhereFromFilters(filters);
    const result = await this.db.runAsync(
      `DELETE FROM ${this.tableName} ${where}`,
      ...whereValues,
    );
   
    return result.changes;
  }
};

export default SQLite;