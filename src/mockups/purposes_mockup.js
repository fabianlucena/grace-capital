import Mockup from './mockup';
import { dateFormat } from '../libs/locale';

class PurposesMockup extends Mockup {
  data = [
    {
      id:          1,
      uuid:        '6a8006b0-991e-4aef-829e-239e6b3bcac9',
      title:       'Uno',
      description: 'Propósito 01',
      fromDate:    '2024-09-14',
      toDate:      '2024-09-15',
    },
    {
      id:          2,
      uuid:        '7fb8c72e-4f10-47ac-8ab9-4820309acd48',
      title:       'Dos',
      description: 'Propósito 02',
      fromDate:    '2024-09-15',
      toDate:      '2024-09-16',
    },
    {
      id:          3,
      uuid:        '096a6af6-0d09-4b9c-a7fc-88032150c461',
      title:       'Tres',
      description: 'Propósito 03',
      fromDate:    '2024-09-16',
      toDate:      '2024-09-17',
    },
  ];
};

export default PurposesMockup;