import { Meteor } from 'meteor/meteor';

import { Offer, OffersCollection } from './OffersCollection';

Meteor.methods({
  'offers.get'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const query = OffersCollection.find();

    return query.fetch();
  },

  'offers.getById'({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return OffersCollection.findOne({ _id: id });
  },

  'offers.insert'({ request }: { request: Offer }) {
    OffersCollection.insert(request);
  },

  'offers.getByEmployerId'({ id }: { id: string }) {
    const query = OffersCollection.find({ employerId: id });

    return query.fetch();
  },

  'offers.remove'({ requestId }: { requestId: string }) {
    OffersCollection.remove(requestId);
  },

  'offers.update'({ request }: { request: Offer & { employerId: string } }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const { employerId, ...requestData } = request;

    OffersCollection.update(
      { _id: requestData._id, employerId: employerId },
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
