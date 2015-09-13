Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, doc){
    return Permissions.ownsDocument(userId, doc);
  },
  remove: function(userId, doc){
    return Permissions.ownsDocument(userId, doc);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames){
    //if fieldNames contains more than just url and title, return true to deny
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes){
    //check arguments
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

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
  }
});