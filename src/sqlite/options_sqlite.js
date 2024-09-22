import uuid from 'react-native-uuid';
import SQLite from './sqlite';
import { dateFormat } from '../libs/locale';

class OptionsSQLite extends SQLite {
  tableName = 'options';
  columns = {
    id:    { type: 'INTEGER', allowNull: false, primaryKey: true },
    uuid:  { type: 'TEXT',    allowNull: false },
    date:  { type: 'TEXT',    allowNull: false },
    name:  { type: 'TEXT',    allowNull: false },
    value: { type: 'TEXT',    allowNull: true },
  };
  columnId = 'id';

  async init() {
    await super.init();
    const list = await this.getList({
      where: {name: 'DB version'},
      orderBy: [['date', 'DESC']],
      limit: 1,
    });

    if (!list?.length) {
      const res = await this.create({
        uuid: uuid.v4(),
        date: new Date,
        name: 'DB version',
        value: '1',
      });
    }
  }

  arrangeDataToSave(row) {
    row = {...row};
    if (row.date instanceof Date) {
      row.date = dateFormat(row.date, '%FT%T.%fZ%z');
    }

    return row;
  }
}

export default OptionsSQLite;