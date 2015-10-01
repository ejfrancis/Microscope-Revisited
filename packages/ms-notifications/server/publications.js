Meteor.publish('notifications', function() {
  return MS.collections.notifications.find({
    userId: this.userId,
    read:false
  });
});
