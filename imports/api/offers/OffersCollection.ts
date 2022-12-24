import { Mongo } from 'meteor/mongo';

export interface Offer {
  _id: string;
  positionName: string;
  salary: string;
  gender: string;
  employerId: string;
}

export const OffersCollection = new Mongo.Collection<Offer>('offers');
