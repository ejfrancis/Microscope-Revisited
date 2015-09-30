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
  var result = Posts.find(_id);
  return Posts.find(_id);
});