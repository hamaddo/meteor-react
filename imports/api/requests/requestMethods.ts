import { Meteor } from 'meteor/meteor';

import { TRequest, RequestsCollection } from './RequestsCollection';

Meteor.methods({
  'requests.get'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const query = RequestsCollection.find();

    return query.fetch();
  },

  'requests.getById'({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return RequestsCollection.findOne({ _id: id });
  },

  'requests.insert'({ request }: { request: TRequest }) {
    RequestsCollection.insert(request);
  },

  'requests.getByClientId'({ id }: { id: string }) {
    const query = RequestsCollection.find({ clientId: id });

    return query.fetch();
  },

  'requests.remove'({ requestId }: { requestId: string }) {
    RequestsCollection.remove(requestId);
  },

  'requests.update'({ request }: { request: TRequest & { clientId: string } }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const { clientId, ...requestData } = request;

    RequestsCollection.update(
      { _id: requestData._id, clientId: clientId },
      {
        $set: {
          ...requestData,
        },
      },
      {
        multi: false,
      }
    );
  },
});
