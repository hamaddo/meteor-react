import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { RolesEnum } from '/imports/api/user/';
import '/imports/api/clients/';
import '/imports/api/requests/';

const SEED_USERNAME = 'test';
const SEED_PASSWORD = 'test';

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    const user = Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });

    Meteor.users.update(user, {
      $set: {
        role: RolesEnum.ADMIN,
      },
    });
  }
});
