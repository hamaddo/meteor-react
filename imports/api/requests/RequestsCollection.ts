import { Mongo } from 'meteor/mongo';

export interface TRequest {
  _id: string;
  positionName: string;
  salary: string;
  clientId: string;
}

export const RequestsCollection = new Mongo.Collection<TRequest>('requests');
