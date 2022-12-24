import { Meteor } from 'meteor/meteor';

import { Client, ClientsCollection } from './ClientsCollection';

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
    ClientsCollection.remove(clientId);
  },

  'clients.update'({ request }: { request: Client & { prevSurname: string } }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const { prevSurname, ...client } = request;

    console.log('request', request);
    ClientsCollection.update(
      { _id: client._id, surname: prevSurname },
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
