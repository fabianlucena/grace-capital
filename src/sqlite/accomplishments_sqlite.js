import SQLite from './sqlite';

class AccomplishmentsSQLite extends SQLite {
  tableName = 'accomplishment';
  columns = {
    id:             { type: 'INTEGER', allowNull: false, primaryKey: true },
    purposeId:      { type: 'INTEGER', allowNull: false },
    date:           { type: 'TEXT',    allowNull: false },
    accomplishment: { type: 'INTEGER', allowNull: false },
  };
  columnId = 'id';
}

export default AccomplishmentsSQLite;