import Mockup from './mockup';
import { dateFormat } from '../libs/locale';

class AccomplishmentsMockup extends Mockup {
  data = [
    {
      id:             1,
      purposeId:      1,
      date:           '2024-09-16T20:00:00',
      accomplishment: 1,
    },
  ];

  arrangeDataToSave(row) {
    row = {...row};
    if (row.date instanceof Date) {
      row.date = dateFormat(row.date, '%FT%T.%fZ%z');
    }

    return row;
  }
};

export default AccomplishmentsMockup;