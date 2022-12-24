import { Meteor } from 'meteor/meteor';

import { Client, ClientsCollection } from './ClientsCollection';

import { RequestsCollection } from '/imports/api/requests';

Meteor.methods({
  'clients.get'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const query = ClientsCollection.find();

    return query.fetch();
  },
  'clients.getById'({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return ClientsCollection.findOne({ _id: id });
  },

  'clients.insert'({ client }: { client: Client }) {
    ClientsCollection.insert(client);
  },

  'clients.remove'({ clientId }: { clientId: string }) {
    const relatedRequests = RequestsCollection.find({ clientId: clientId }).fetch();
    console.log('relatedRequests', relatedRequests);
    if (relatedRequests) {
      relatedRequests.forEach((req) => {
        RequestsCollection.remove(req._id);
      });
    }
    ClientsCollection.remove(clientId);
  },

  'clients.update'({ request }: { request: Client & { prevRegistryNumber: string } }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const { prevRegistryNumber, ...client } = request;

    console.log('request', request);
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
