declare module 'meteor/meteor' {
  namespace Meteor {
    interface UserProfile {
      name: string;
      surname: string;
      patronymic: string;
      passport: string;
      role: string;
    }

    interface User {
      role?: string;
    }
  }
}
