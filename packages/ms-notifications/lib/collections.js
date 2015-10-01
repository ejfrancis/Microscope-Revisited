MS.collections.notifications = new Mongo.Collection('notifications');

MS.collections.notifications.allow({
  update: function(userId, doc, fieldNames) {
    //allow if user owns the document
    return MS.permissions.ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

MS.collections.notifications.createCommentNotification = function(comment) {
  var post = MS.collections.posts.findOne(comment.postId);
  //only create notification if current user isn't the creator
  if (comment.userId !== post.userId) {
    MS.collections.notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};