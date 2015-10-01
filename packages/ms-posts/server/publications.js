Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  //use pagination options to retrieve subset
  return MS.collections.Posts.find({}, options);
});

Meteor.publish('singlePost', function(_id) {
  check(_id, String);
  return MS.collections.Posts.find(_id);
});