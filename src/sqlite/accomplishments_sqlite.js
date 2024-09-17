import SQLite from './sqlite';
import { dateFormat } from '../libs/locale';

class AccomplishmentsSQLite extends SQLite {
  tableName = 'accomplishment';
  columns = {
    id:             { type: 'INTEGER', allowNull: false, primaryKey: true },
    purposeId:      { type: 'INTEGER', allowNull: false },
    date:           { type: 'TEXT',    allowNull: false },
    accomplishment: { type: 'INTEGER', allowNull: false },
  };
  columnId = 'id';

  arrangeDataToSave(row) {
    row = {...row};
    if (row.date instanceof Date) {
      row.date = dateFormat(row.date, '%FT%T.%fZ%z');
    }

    return row;
  }
}

export default AccomplishmentsSQLite;