import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('user', function () {
    if (!this.userId) {
      console.log('call');
      this.ready();
      return;
    }

    return Meteor.users.find({}, { fields: { username: 1, emails: 1, profile: 1, role: 1 } });
  });
}
