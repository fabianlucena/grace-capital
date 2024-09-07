// `execAsync()` is useful for bulk queries when you want to execute altogether.
// Please note that `execAsync()` does not escape parameters and may lead to SQL injection.
/*await db.execAsync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS purpopses(
    id INTEGER PRIMARY KEY NOT NULL,
    uuid TEXT NOT NULL,
    title TEXT NOT NULL
  );
  INSERT INTO test (uuid, title) VALUES ('1', 'test1');
  INSERT INTO test (uuid, title) VALUES ('2', 'test2');
  INSERT INTO test (uuid, title) VALUES ('3', 'test3');
`);*/

import SQLite from './sqlite';

class PurposeSQLite extends SQLite {
  tableName = 'purpopses';
  columns = {
    id:    { type: 'INTEGER', allowNull: false, primaryKey: true },
    uuid:  { type: 'TEXT',    allowNull: false },
    title: { type: 'TEXT',    allowNull: false },
  };
  columnId = 'id';


}

export default PurposeSQLite;