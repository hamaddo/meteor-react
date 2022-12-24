import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { RolesEnum } from '/imports/api/user/index';

export enum UserMethods {
  Get = 'user.get',
  GetById = 'user.getById',
  GetUserRole = 'user.getUserRole',
  Insert = 'user.insert',
  Remove = 'user.remove',
  Update = 'user.update',
}

Meteor.methods({
  [UserMethods.Get]() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    return Meteor.users.find({}).fetch();
  },

  [UserMethods.GetById]({ id }: { id: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    return Meteor.users.findOne({ _id: id });
  },

  [UserMethods.Insert]({ username, password, role }: { username: string; password: string; role: RolesEnum }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const user = Accounts.createUser({
      username,
      password,
    });

    Meteor.users.update(user, {
      $set: {
        username,
        role: role,
      },
    });

    return user;
  },

  [UserMethods.Remove]({ userId }: { userId: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    Meteor.users.remove({ _id: userId });
  },

  [UserMethods.GetUserRole]() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    return Meteor.users.findOne({ _id: this.userId })?.role;
  },

  [UserMethods.Update]({ userId, username, role }: { userId: string; username: string; role: RolesEnum }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    Meteor.users.update(userId, {
      $set: {
        username,
        role: role,
      },
    });
  },
});
