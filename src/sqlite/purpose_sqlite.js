import SQLite from './sqlite';

class PurposeSQLite extends SQLite {
  tableName = 'purposes';
  columns = {
    id:          { type: 'INTEGER', primaryKey: true },
    uuid:        { type: 'TEXT',    allowNull: false },
    title:       { type: 'TEXT',    allowNull: false },
    description: { type: 'TEXT',    allowNull: true },
    fromDate:    { type: 'TEXT',    allowNull: false },
    toDate:      { type: 'TEXT',    allowNull: true },
  };
  columnId = 'id';
}

export default PurposeSQLite;