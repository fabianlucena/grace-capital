import SQLite from './sqlite';
import { dateFormat } from '../libs/locale';

class PurposesSQLite extends SQLite {
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

  arrangeDataToSave(row) {
    row = {...row};

    if (row.fromDate instanceof Date) {
      row.fromDate = dateFormat(row.fromDate, '%F');
    }

    if (row.toDate instanceof Date) {
      row.toDate = dateFormat(row.toDate, '%F');
    }

    return row;
  }
}

export default PurposesSQLite;