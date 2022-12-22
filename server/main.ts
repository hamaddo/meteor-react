import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import '/imports/api/user/';

const SEED_USERNAME = 'test';
const SEED_PASSWORD = 'test';

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
