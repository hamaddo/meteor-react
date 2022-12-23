import { Meteor } from 'meteor/meteor';

import { ClientsCollection } from './ClientsCollection';

Meteor.publish('clients', function publishClients() {
  return ClientsCollection.find({});
});
