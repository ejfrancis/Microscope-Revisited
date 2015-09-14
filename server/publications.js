
Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  //use pagination options to retrieve subset
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(_id) {
  check(_id, String);
  return Posts.find(_id);
});

Meteor.publish('comments', function(postId){
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({
    userId: this.userId,
    read:false
  });
});
