import { Meteor } from 'meteor/meteor';

import { EmployersCollection } from './EmployersCollection';

Meteor.publish('employers', function publishEmployers() {
  return EmployersCollection.find({});
});
