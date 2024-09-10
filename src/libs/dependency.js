import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native'
import PurposeMockup from '../mockups/purpose_mockup';
import PurposeSQLite from '../sqlite/purpose_sqlite';
import PurposeService from '../services/purpose_service';
import OptionSQLite from '../sqlite/options_sqlite';
import AccomplishmentSQLite from '../sqlite/accomplishment_sqlite';
import OptionMockup from '../mockups/option_mockup';
import AccomplishmentMockup from '../mockups/accomplishment_mockup';

let dependencies = {};

export async function init() {
  let optionRepo,
    purposeRepo,
    accomplishmentRepo;
  if (Platform.OS === 'web') {
    optionRepo = new OptionMockup();
    purposeRepo = new PurposeMockup();
    accomplishmentRepo = new AccomplishmentMockup();
  } else {
    const gc = await SQLite.openDatabaseAsync('grace-capital');
    optionRepo = new OptionSQLite(gc);
    purposeRepo = new PurposeSQLite(gc);
    accomplishmentRepo = new AccomplishmentSQLite(gc);
    //await optionRepo.dropTable();
    //await purposeRepo.dropTable();
    //await accomplishmentRepo.dropTable();
    await optionRepo.init();
    await purposeRepo.init();
    await accomplishmentRepo.init();
  }

  dependencies = {
    purposeService: new PurposeService(purposeRepo),
  };
}

export default function getDependency(name) {
  const dependency = dependencies[name];
  if (!dependency) {
    throw new Error('Dependency does not exist: ' + name);
  }

  return dependency;
}