import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.publish('usersRoles', function () {
  return Meteor.users.find(
    {},
    {
      fields: {
        roles: 1,
      },
    }
  );
});

Meteor.methods({
  'user.get'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    return Meteor.users.find({}).fetch();
  },

  'user.getById'({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    return Meteor.users.findOne({ _id: id });
  },

  'user.insert'({ username, password }: { username: string; password: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    return Accounts.createUser({ username, password });
  },

  'user.register'({ username, password }: { username: string; password: string }) {
    return Accounts.createUser({ username, password });
  },

  'user.remove'({ userId }: { userId: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    Meteor.users.remove({ _id: userId });
  },
});
