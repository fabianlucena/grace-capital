import Service from './service';

class PurposesService extends Service {
  references = {
    accomplishments: {
      service: 'accomplishmentsService',
      key: 'id',
      foreignKey: 'purposeId',
    },
  }
};

export default PurposesService;