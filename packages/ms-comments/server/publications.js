Meteor.publish('comments', function(postId){
  check(postId, String);
  return MS.collections.comments.find({postId: postId});
});
