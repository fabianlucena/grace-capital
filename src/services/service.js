import uuid from 'react-native-uuid';

class Service {
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

  async getList(options) {
    return this.model.getList(options);
  }

  async getListFor(filters, options) {
    return this.getList({...options, filters});
  }

  async getSingleOrNullForId(id) {
    return this.model.getSingleOrNullFor({id});
  }

  async updateForId(id, data) {
    return this.model.updateFor({id}, data);
  }

  async deleteForId(id) {
    return this.model.deleteFor({id});
  }
};

export default Service;