import { Mongo } from 'meteor/mongo';

export interface Client {
  _id: string;
  name: string;
  surname: string;
  middleName: string;
  registryNumber: string;
  address: string;
  gender: string;
  receiptNumber: string;
  phone: string;
}

export const ClientsCollection = new Mongo.Collection<Client>('clients');
