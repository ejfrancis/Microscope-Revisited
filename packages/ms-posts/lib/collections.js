MS.collections.posts = new Mongo.Collection('posts');

MS.collections.posts.allow({
  remove: function(userId, doc){
    return MS.permissions.ownsDocument(userId, doc);
  }
});

MS.collections.posts.validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a title";
  if (!post.url)
    errors.url =  "Please fill in a URL";
  return errors;
};

Meteor.methods({
  postInsert: function(postAttributes){
    //check arguments
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    //validate this post
    var errors = MS.collections.posts.validatePost(postAttributes);
    if (errors.title || errors.url) {
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    }
    //if this URL is a repost, redirect to that page
    var postWithSameLink = MS.collections.posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    //create post object
    var user = Meteor.user();
    var post = _.extend(postAttributes,{
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
    var postId = MS.collections.posts.insert(post);

    return {
      _id: postId
    }
  },

  postEdit: function(currentPostId, currentPost, updatedPost){
    check(Meteor.userId(), String);
    check(currentPostId, String);
    check(currentPost, {
      title: String,
      url: String
    });
    check(updatedPost, {
      title: String,
      url: String
    });

    //validate this post
    var errors = MS.collections.posts.validatePost(updatedPost);
    if (errors.title || errors.url) {
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    }

    //only allow editing of url or title
    var editAllowed = (_.without(_.keys(updatedPost), 'url', 'title').length  ===  0);

    if(!editAllowed){
      return alert('You can only edit the title or url of a post');
    }

    //if the url was edited and the new url already exists, redirect to that page instead of editing
    var postWithSameLink = MS.collections.posts.findOne({url: updatedPost.url});
    if(postWithSameLink && (postWithSameLink._id !== currentPostId)){
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    MS.collections.posts.update(currentPostId, {$set: updatedPost});

    return {
      _id: currentPostId
    };
  },

  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    //update posts that this user hasn't already upvoted, to perform get and update in single db call
    var affected = MS.collections.posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    if (! affected) {
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
    }
  }
});