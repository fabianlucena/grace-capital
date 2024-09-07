class SQLite {
  db = null;

  constructor(db) {
    this.db = db;
  }

  async init() {
    await this.createTable();
  }

  async createTable() {
    const columns = [];
    for (const name in this.columns) {
      const column = this.columns[name];
      let definition = `${name} ${column.type}`;
      if (typeof column.allowNull !== 'undefined') {
        definition += ' ' + column.allowNull? 'NULL': 'NOT NULL';
      }
      if (column.primaryKey) {
        definition += ' PRIMARY KEY';
      }

      columns.push(definition);
    }

    const sql = `PRAGMA journal_mode = WAL;CREATE TABLE IF NOT EXISTS ${this.tableName}(${columns.join(',')});`
    await this.db.execAsync(sql);
  }

  async create(data) {
    const columns = [],
      questions = [],
      values = [];
    for (const c in data) {
      columns.push(c);
      questions.push('?');
      values.push(data[c]);
    }
    const result = await this.db.runAsync(
      `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES (${questions.join(',')})`,
      ...values
    );

    if (this.columnId) {
      data[this.columnId] = result.lastInsertRowId;
    }

    return data;
  }

  async getList() {
    return await this.db.getAllAsync(
      `SELECT * FROM ${this.tableName}`
    );
  }

  getWhereFromFilters(filters) {
    const wheres = [];
    for(const f in filters) {
      wheres.push(`${f}="${filters[f]}"`);
    }

    return wheres.join(' AND ');
  }

  async getListFor(filters) {
    const where = this.getWhereFromFilters(filters);
    return await this.db.getAllAsync(
      `SELECT * FROM ${this.tableName} WHERE ${where}`
    );
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
    const set = [];
    const values = [];
    for (const c in data) {
      set.push(`${c}=?`);
      values.push(data[c]);
    }

    const where = this.getWhereFromFilters(filters);
    const result = await this.db.runAsync(
      `UPDATE ${this.tableName} SET ${set.join(',')} WHERE ${where}`,
      ...values
    );
   
    return result.changes;
  }

  async deleteFor(filters) {
    const where = this.getWhereFromFilters(filters);
    const result = await this.db.runAsync(
      `DELETE FROM ${this.tableName} WHERE ${where}`
    );
   
    return result.changes;
  }
};

export default SQLite;