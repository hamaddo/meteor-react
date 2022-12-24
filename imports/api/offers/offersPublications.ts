import { Meteor } from 'meteor/meteor';

import { OffersCollection } from './OffersCollection';

Meteor.publish('offers', function publishOffers() {
  return OffersCollection.find({});
});
