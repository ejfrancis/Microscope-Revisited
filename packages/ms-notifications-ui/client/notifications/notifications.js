Template.notifications.helpers({
  notifications: function() {
    return MS.collections.notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return MS.collections.notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return FlowRouter.path('postPage',{_id: this.postId});
  }
});

Template.notificationItem.events({
  'click a': function() {
    MS.collections.notifications.update(this._id, {$set: {read: true}});
  }
});