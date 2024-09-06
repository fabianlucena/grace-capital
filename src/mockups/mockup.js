class Mockup {
  mockup = [];

  async create(data) {
    this.mockup = [...this.mockup, data];
    return data;
  }

  async getList() {
    return this.mockup;
  }

  async getListFor(filters) {
    return this.mockup.filter(item => {
      for(const f in filters) {
        if (item[f] != filters[f]) {
          return false;
        }
      }

      return true;
    });
  }

  async getSingleOrNullFor(filters) {
    const list = await this.getListFor(filters);
    if (!list?.length) {
      return;
    }

    if (list.length > 1) {
      throw new Error('There are many rows');
    }

    return list[0];
  }

  async updateFor(filters, data) {
    let count = 0;
    this.mockup = this.mockup.map(item => {
      for(const f in filters) {
        if (item[f] != filters[f]) {
          return item;
        }
      }

      count++;
      return {...item, ...data};
    });
   
    return count;
  }

  async deleteFor(filters) {
    this.mockup = this.mockup.filter(item => {
      for(const f in filters) {
        if (item[f] != filters[f]) {
          return true;
        }
      }

      return false;
    });
  }
};

export default Mockup;