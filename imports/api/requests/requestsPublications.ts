import { Meteor } from 'meteor/meteor';

import { RequestsCollection } from './RequestsCollection';

Meteor.publish('requests', function publishRequests() {
  return RequestsCollection.find({});
});
