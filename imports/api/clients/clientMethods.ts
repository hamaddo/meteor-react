import { Meteor } from 'meteor/meteor';

import { Client, ClientsCollection } from './ClientsCollection';

import { RequestsCollection } from '/imports/api/requests';

export enum ClientMethods {
  Get = 'clients.get',
  GetById = 'clients.getById',
  Insert = 'clients.insert',
  Remove = 'clients.remove',
  Update = 'clients.update',
}

Meteor.methods({
  [ClientMethods.Get]() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const query = ClientsCollection.find();

    return query.fetch();
  },
  [ClientMethods.GetById]({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return ClientsCollection.findOne({ _id: id });
  },

  [ClientMethods.Insert]({ client }: { client: Client }) {
    ClientsCollection.insert(client);
  },

  [ClientMethods.Remove]({ clientId }: { clientId: string }) {
    const relatedRequests = RequestsCollection.find({ clientId: clientId }).fetch();
    console.log('relatedRequests', relatedRequests);
    if (relatedRequests) {
      relatedRequests.forEach((req) => {
        RequestsCollection.remove(req._id);
      });
    }
    ClientsCollection.remove(clientId);
  },

  [ClientMethods.Update]({ request }: { request: Client & { prevRegistryNumber: string } }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const { prevRegistryNumber, ...client } = request;

    ClientsCollection.update(
      { _id: client._id, registryNumber: prevRegistryNumber },
      {
        $set: {
          ...client,
        },
      },
      {
        multi: false,
      }
    );
  },
});
