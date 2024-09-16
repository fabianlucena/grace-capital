import uuid from 'react-native-uuid';
import getDependency from '../libs/dependency';
import Op from '../libs/operators';

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
    const list = await this.model.getList(options);
    if (!list.length) {
      return list;
    }

    if (options?.include) {
      if (!this.references) {
        throw new Error(`${this.constructor.name} does not have references.`);
      }

      for (const name in options.include) {
        const reference = this.references[name];
        if (!reference) {
          throw new Error(`Reference ${name} does not exists in ${this.constructor.name}.`);
        }

        if (!reference.service) {
          throw new Error(`Reference ${name} does not have service in ${this.constructor.name}.`);
        }

        const key = reference.key;
        if (!key) {
          throw new Error(`Reference ${name} does not have key in ${this.constructor.name}.`);
        }

        const foreignKey = reference.foreignKey;
        if (!foreignKey) {
          throw new Error(`Reference ${name} does not have foreignKey in ${this.constructor.name}.`);
        }

        const service = getDependency(reference.service);
        if (!service) {
          throw new Error(`Service ${include.service} does not exists for reference ${name} in ${this.constructor.name}.`);
        }

        const include = options.include[name];

        await Promise.all(list.map(async item => {
          const filtersItems = [{[foreignKey]: item[key]}];
          if (include.filters) {
            filtersItems.push(include.filters);
          }

          const filters = { [Op.and]: filtersItems };
          const children = await service.getList({ filters });

          item[name] = children;
        }));
      }
    }

    return list;
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