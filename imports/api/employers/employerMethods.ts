import { Meteor } from 'meteor/meteor';

import { Employer, EmployersCollection } from './EmployersCollection';

import { RequestsCollection } from '/imports/api/requests';

export enum EmployerMethods {
  Get = 'employers.get',
  GetById = 'employers.getById',
  Insert = 'employers.insert',
  Remove = 'employers.remove',
  Update = 'employers.update',
}

Meteor.methods({
  [EmployerMethods.Get]() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const query = EmployersCollection.find();

    return query.fetch();
  },
  [EmployerMethods.GetById]({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return EmployersCollection.findOne({ _id: id });
  },

  [EmployerMethods.Insert]({ employer }: { employer: Employer }) {
    EmployersCollection.insert(employer);
  },

  [EmployerMethods.Remove]({ employerId }: { employerId: string }) {
    const relatedRequests = RequestsCollection.find({ employerId: employerId }).fetch();
    if (relatedRequests) {
      relatedRequests.forEach((req) => {
        RequestsCollection.remove(req._id);
      });
    }
    EmployersCollection.remove(employerId);
  },

  [EmployerMethods.Update]({ request }: { request: Employer & { prevRegistryNumber: string } }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const { prevRegistryNumber, ...employer } = request;

    EmployersCollection.update(
      { _id: employer._id, registryNumber: prevRegistryNumber },
      {
        $set: {
          ...employer,
        },
      },
      {
        multi: false,
      }
    );
  },
});
