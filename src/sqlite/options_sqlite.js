import SQLite from './sqlite';

class OptionsSQLite extends SQLite {
  tableName = 'options';
  columns = {
    id:    { type: 'INTEGER', allowNull: false, primaryKey: true },
    uuid:  { type: 'TEXT',    allowNull: false },
    name:  { type: 'TEXT',    allowNull: false },
    value: { type: 'TEXT',    allowNull: true },
  };
  columnId = 'id';
}

export default OptionsSQLite;