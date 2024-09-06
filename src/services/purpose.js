import uuid from 'react-native-uuid';

class PurposeService {
  constructor(db) {
    this.db = db;
  }

  async create(data) {
    if (!data) {
      return;
    }
    
    if (!data.uuid) {
      data.uuid = uuid.v4();
    }

    return this.db.create(data);
  }

  async getList() {
    return this.db.getList();
  }

  async getSingleOrNullForUuid(uuid) {
    return this.db.getSingleOrNullFor({uuid});
  }

  async updateForUuid(uuid, data) {
    return this.db.updateFor({uuid}, data);
  }

  async deleteForUuid(uuid) {
    return this.db.deleteFor({uuid});
  }
};

export default PurposeService;