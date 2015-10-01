Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  //use pagination options to retrieve subset
  return MS.collections.posts.find({}, options);
});

Meteor.publish('singlePost', function(_id) {
  check(_id, String);
  return MS.collections.posts.find(_id);
});