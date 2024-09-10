import Mockup from './mockup';

class PurposeMockup extends Mockup {
  data = [
    {
      id: 1,
      uuid: '6a8006b0-991e-4aef-829e-239e6b3bcac9',
      title: 'Uno',
      fromDate: new Date(2024, 8, 8, 0, 0, 0),
      toDate:   new Date(2024, 8, 9, 0, 0, 0),
    },
    {
      id: 2,
      uuid: '7fb8c72e-4f10-47ac-8ab9-4820309acd48',
      title: 'Dos',
      fromDate: new Date(2024, 8, 9,  0, 0, 0),
      toDate:   new Date(2024, 8, 10, 0, 0, 0),
    },
    {
      id: 3,
      uuid: '096a6af6-0d09-4b9c-a7fc-88032150c461',
      title: 'Tres',
      fromDate: new Date(2024, 8, 10, 0, 0, 0),
      toDate:   new Date(2024, 8, 11, 0, 0, 0),
    },
  ];
};

export default PurposeMockup;