import uuid from 'react-native-uuid';

class PurposeService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    if (!data) {
      return;
    }
    
    if (!data.uuid) {
      data.uuid = uuid.v4();
    }

    return this.model.create(data);
  }

  async getList() {
    return this.model.getList();
  }

  async getSingleOrNullForUuid(uuid) {
    return this.model.getSingleOrNullFor({uuid});
  }

  async updateForUuid(uuid, data) {
    return this.model.updateFor({uuid}, data);
  }

  async deleteForUuid(uuid) {
    return this.model.deleteFor({uuid});
  }
};

export default PurposeService;