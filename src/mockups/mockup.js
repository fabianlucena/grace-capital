import execFilter from '../libs/exec_filter';
import Op from '../libs/operators';

class Mockup {
  data = [];

  arrangeDataToSave(row) {
    return {...row};
  }

  arrangeLoadedData(row) {
    return {...row};
  }

  async create(data) {
    const maxId = this.data.reduce((maxId, item) => {
      if (maxId < item.id) {
        return item.id;
      }

      return maxId;
    }, 0);
    
    data = {id: (maxId ?? 0) + 1, ...this.arrangeDataToSave(data)};
    this.data = [...this.data, data];
    return data;
  }

  getFilterFromOptions(options) {
    const filters = options?.filters;
    if (!filters) {
      return;
    }

    const keys = Object.keys(filters);
    const symbols = Object.getOwnPropertySymbols(filters);
    if ((keys.length + symbols.length) < 2) {
      return filters;
    }

    let filtersLits = [];
    for (const k of keys) {
      filtersLits.push({[k]: filters[k]});
    }

    for (const s of symbols) {
      filtersLits.push({[s]: filters[s]});
    }

    return {[Op.and]: filtersLits};
  }

  async getList(options) {
    const filter = this.getFilterFromOptions(options);
    let list;
    if (filter) {
      list = this.data.filter(item => execFilter(filter, item));
    } else {
      list = this.data;
    }
    
    list = list.map(this.arrangeLoadedData);

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
    const filter = this.getFilterFromOptions({filters});
    let count = 0;
    this.data = this.data.map(item => {
      if (!execFilter(filter, item)) {
        return item;
      }

      count++;
      return {...item, ...data};
    });
   
    return count;
  }

  async deleteFor(filters) {
    const filter = this.getFilterFromOptions({filters});

    const previousCount = this.data.length;
    this.data = this.data.filter(item => !execFilter(filter, item));

    return previousCount - this.data.length;
  }
};

export default Mockup;