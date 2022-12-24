import { Meteor } from 'meteor/meteor';

import { TRequest, RequestsCollection } from './RequestsCollection';

export enum RequestMethods {
  Get = 'requests.get',
  GetById = 'requests.getById',
  Insert = 'requests.insert',
  GetByClientId = 'requests.getByClientId',
  Remove = 'requests.remove',
  Update = 'requests.update',
}

Meteor.methods({
  [RequestMethods.Get]() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const query = RequestsCollection.find();

    return query.fetch();
  },

  [RequestMethods.GetById]({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return RequestsCollection.findOne({ _id: id });
  },

  [RequestMethods.Insert]({ request }: { request: TRequest }) {
    RequestsCollection.insert(request);
  },

  [RequestMethods.GetByClientId]({ id }: { id: string }) {
    const query = RequestsCollection.find({ clientId: id });

    return query.fetch();
  },

  [RequestMethods.Remove]({ requestId }: { requestId: string }) {
    RequestsCollection.remove(requestId);
  },

  [RequestMethods.Update]({ request }: { request: TRequest & { clientId: string } }) {
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
