import execFilter from '../libs/exec_filter';
import Op from '../libs/operators';

class Mockup {
  data = [];

  async create(data) {
    const maxId = this.data.reduce((maxId, item) => {
      if (maxId < item.id) {
        maxId = item.id;
      }
    }, 0);
    data.id = maxId + 1;
    this.data = [...this.data, data];
    return data;
  }

  async getList(options) {
    let list,
      filters = options?.filters;
    if (filters) {
      const keys = Object.keys(filters);
      const symbols = Object.getOwnPropertySymbols(filters);
      if ((keys.length + symbols.length) > 1) {
        let filtersLits = [];
        for (const k of keys) {
          filtersLits.push({[k]: filters[k]});
        }

        for (const s of symbols) {
          filtersLits.push({[s]: filters[s]});
        }

        filters = {[Op.and]: filtersLits};
      }
      
      list = this.data.filter(item => execFilter(filters, item));
    } else {
      list = this.data;
    }

    return list;
  }

  async getSingleOrNullFor(filters) {
    const list = await this.getList({filters});
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
    this.data = this.data.map(item => {
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
    this.data = this.data.filter(item => {
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