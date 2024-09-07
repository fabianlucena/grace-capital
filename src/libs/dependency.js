import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native'
import PurposeMockup from '../mockups/purpose_mockup';
import PurposeSQLite from '../sqlite/purpose_sqlite';
import PurposeService from '../services/purposeService';

let dependencies = {};

export async function init() {
  let purposeRepo;
  if (Platform.OS === 'web') {
    purposeRepo = new PurposeMockup();
  } else {
    const gc = await SQLite.openDatabaseAsync('grace-capital');
    purposeRepo = new PurposeSQLite(gc);
    await purposeRepo.init();
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