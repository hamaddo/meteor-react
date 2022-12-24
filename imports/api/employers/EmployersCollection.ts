import { Mongo } from 'meteor/mongo';

export enum OwnershipType {
  OOO = 'ООО',
  IP = 'ИП',
  ZAO = 'ЗАО',
}

export interface Employer {
  _id: string;
  name: string;
  ownershipType: OwnershipType;
  registryNumber: string;
  address: string;
  phone: string;
}

export const EmployersCollection = new Mongo.Collection<Employer>('employers');
