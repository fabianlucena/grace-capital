import getDependency from '../libs/dependency';
import Service from './service';

class PurposesService extends Service {
  useUuid = true;
  references = {
    accomplishments: {
      service: 'accomplishmentsService',
      key: 'id',
      foreignKey: 'purposeId',
    },
  }

  init() {
    super.init();
    this.accomplishmentsService = getDependency('accomplishmentsService');    
  }

  async addAccomplishmentForIdAndDate(id, date) {
    this.accomplishmentsService.create({
      purposeId: id,
      date,
      accomplishment: 1,
    });
  }

  async deleteAccomplishmentForIdAndDate(id, date) {
    this.accomplishmentsService.deleteFor({
      purposeId: id,
      date,
    });
  }
};

export default PurposesService;