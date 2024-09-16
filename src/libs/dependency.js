import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native'
import OptionsMockup from '../mockups/options_mockup';
import OptionsSQLite from '../sqlite/options_sqlite';
import PurposesMockup from '../mockups/purposes_mockup';
import PurposesSQLite from '../sqlite/purposes_sqlite';
import PurposesService from '../services/purposes_service';
import AccomplishmentsMockup from '../mockups/accomplishments_mockup';
import AccomplishmentsSQLite from '../sqlite/accomplishments_sqlite';
import AccomplishmentsService from '../services/accomplishments_service';

let dependencies = {};

export async function init() {
  let optionsRepo,
    purposesRepo,
    accomplishmentsRepo;
  if (Platform.OS === 'web') {
    optionsRepo = new OptionsMockup();
    purposesRepo = new PurposesMockup();
    accomplishmentsRepo = new AccomplishmentsMockup();
  } else {
    const gc = await SQLite.openDatabaseAsync('grace-capital');
    optionsRepo = new OptionsSQLite(gc);
    purposesRepo = new PurposesSQLite(gc);
    accomplishmentsRepo = new AccomplishmentsSQLite(gc);
    //await optionRepo.dropTable();
    //await purposeRepo.dropTable();
    //await accomplishmentRepo.dropTable();
    await optionsRepo.init();
    await purposesRepo.init();
    await accomplishmentsRepo.init();
  }

  dependencies = {
    optionsService: new PurposesService(optionsRepo),
    purposesService: new PurposesService(purposesRepo),
    accomplishmentsService: new AccomplishmentsService(accomplishmentsRepo),
  };

  dependencies.optionsService.init();
  dependencies.purposesService.init();
  dependencies.accomplishmentsService.init();
}

export default function getDependency(name) {
  const dependency = dependencies[name];
  if (!dependency) {
    throw new Error('Dependency does not exist: ' + name);
  }

  return dependency;
}