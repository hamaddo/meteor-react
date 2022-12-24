import { Meteor } from 'meteor/meteor';

import { Offer, OffersCollection } from './OffersCollection';

export enum OffersMethods {
  Get = 'offers.get',
  GetById = 'offers.getById',
  Insert = 'offers.insert',
  GetByEmployerId = 'offers.getByEmployerId',
  Remove = 'offers.remove',
  Update = 'offers.update',
}

Meteor.methods({
  [OffersMethods.Get]() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const query = OffersCollection.find();

    return query.fetch();
  },

  [OffersMethods.GetById]({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return OffersCollection.findOne({ _id: id });
  },

  [OffersMethods.Insert]({ request }: { request: Offer }) {
    OffersCollection.insert(request);
  },

  [OffersMethods.GetByEmployerId]({ id }: { id: string }) {
    const query = OffersCollection.find({ employerId: id });

    return query.fetch();
  },

  [OffersMethods.Remove]({ requestId }: { requestId: string }) {
    OffersCollection.remove(requestId);
  },

  [OffersMethods.Update]({ request }: { request: Offer & { employerId: string } }) {
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
