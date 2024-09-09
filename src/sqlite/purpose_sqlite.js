import SQLite from './sqlite';

class PurposeSQLite extends SQLite {
  tableName = 'purpopses';
  columns = {
    id:          { type: 'INTEGER', allowNull: false, primaryKey: true },
    uuid:        { type: 'TEXT',    allowNull: false },
    title:       { type: 'TEXT',    allowNull: false },
    description: { type: 'TEXT',    allowNull: true },
    from:        { type: 'TEXT',    allowNull: false },
    to:          { type: 'TEXT',    allowNull: true },
  };
  columnId = 'id';
}

export default PurposeSQLite;