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
import { addDependency } from './dependency';

export async function configureDependencies() {
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
    //await optionsRepo.dropTable();
    //await purposesRepo.dropTable();
    //await accomplishmentsRepo.dropTable();
    await optionsRepo.init();
    await purposesRepo.init();
    await accomplishmentsRepo.init();
  }

  const
    optionsService = new PurposesService(optionsRepo),
    purposesService = new PurposesService(purposesRepo),
    accomplishmentsService = new AccomplishmentsService(accomplishmentsRepo);

  addDependency('optionsService', optionsService);
  addDependency('purposesService', purposesService);
  addDependency('accomplishmentsService', accomplishmentsService);

  optionsService.init();
  purposesService.init();
  accomplishmentsService.init();
}