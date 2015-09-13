Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userID, doc){
    //only allow posting if logged in
    return !!userID;
  }
});