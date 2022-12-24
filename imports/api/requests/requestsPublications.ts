import { Meteor } from 'meteor/meteor';

import { RequestsCollection } from './RequestsCollection';

if (Meteor.isServer) {
  Meteor.publish('requests', function publishRequests() {
    return RequestsCollection.find({});
  });
}
