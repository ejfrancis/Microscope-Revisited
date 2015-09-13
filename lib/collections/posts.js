Posts = new Mongo.Collection('posts');

Posts.allow({
  remove: function(userId, doc){
    return Permissions.ownsDocument(userId, doc);
  }
});

Validation =  {
  Posts: {}
};
Validation.Posts.validatePost = function (post) {
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
    var errors = Validation.Posts.validatePost(postAttributes);
    if (errors.title || errors.url) {
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    }
    //if this URL is a repost, redirect to that page
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
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
      submitted: new Date()
    });
    var postId = Posts.insert(post);

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

    //only allow editing of url or title
    var editAllowed = (_.without(_.keys(updatedPost), 'url', 'title').length  ===  0);

    if(!editAllowed){
      return alert('You can only edit the title or url of a post');
    }

    //if the url was edited and the new url already exists, redirect to that page instead of editing
    var postWithSameLink = Posts.findOne({url: updatedPost.url});
    if(postWithSameLink && (postWithSameLink._id !== currentPostId)){
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    Posts.update(currentPostId, {$set: updatedPost});

    return {
      _id: currentPostId
    };
  }
});