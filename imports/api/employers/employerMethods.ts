import { Meteor } from 'meteor/meteor';

import { Employer, EmployersCollection } from './EmployersCollection';

import { RequestsCollection } from '/imports/api/requests';

Meteor.methods({
  'employers.get'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const query = EmployersCollection.find();

    return query.fetch();
  },
  'employers.getById'({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return EmployersCollection.findOne({ _id: id });
  },

  'employers.insert'({ employer }: { employer: Employer }) {
    EmployersCollection.insert(employer);
  },

  'employers.remove'({ employerId }: { employerId: string }) {
    const relatedRequests = RequestsCollection.find({ employerId: employerId }).fetch();
    console.log('relatedRequests', relatedRequests);
    if (relatedRequests) {
      relatedRequests.forEach((req) => {
        RequestsCollection.remove(req._id);
      });
    }
    EmployersCollection.remove(employerId);
  },

  'employers.update'({ request }: { request: Employer & { prevRegistryNumber: string } }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const { prevRegistryNumber, ...employer } = request;

    console.log('request', request);
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
