import uuid from 'react-native-uuid';

class PurposeService {
  static mockup = [
    {
      uuid: '6a8006b0-991e-4aef-829e-239e6b3bcac9',
      title: 'Uno',
    },
    {
      uuid: '7fb8c72e-4f10-47ac-8ab9-4820309acd48',
      title: 'Dos',
    },
    {
      uuid: '096a6af6-0d09-4b9c-a7fc-88032150c461',
      title: 'Tres',
    },
  ];

  static async create(data) {
    if (!data) {
      return;
    }
    
    if (!data.uuid) {
      data.uuid = uuid.v4();
    }
    
    this.mockup = [...this.mockup, data];
  }

  static async getList() {
    return this.mockup;
  }

  static async getForUuid(uuid) {
    return this.mockup.find(p => p.uuid === uuid);
  }

  static async updateForUuid(uuid, data) {
    const item = this.mockup.find(p => p.uuid === uuid);
    if (!item) {
      return;
    }

    for (const k in data) {
      item[k] = data[k];
    }
   
    this.mockup = [...this.mockup];
  }

  static async deleteForUuid(uuid) {
    this.mockup = this.mockup.filter(p => p.uuid !== uuid);
  }
};

export default PurposeService;