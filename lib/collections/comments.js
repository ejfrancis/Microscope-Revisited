Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });

    //make sure this comment is for a real post
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    if (!post) {
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');
    }

    //add on user and date information (on the server so it's safe)
    var comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    //update this post's comment count
    Posts.update(comment.postId, {
      $inc: {
        commentsCount: 1
      }
    });

    return Comments.insert(comment);
  }
});