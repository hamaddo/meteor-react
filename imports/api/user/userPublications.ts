import { Meteor } from 'meteor/meteor';

Meteor.publish(null, function () {
  if (this.userId) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  } else {
    this.ready();
  }
});
