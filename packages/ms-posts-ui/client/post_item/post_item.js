Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;   
  },
  ownPost: function(){
    return this.userId === Meteor.userId();
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    //if this user hasn't already upvoted this post, enable button
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },
  post: function(){
    //debugger;
    var post = MS.collections.posts.findOne(this._id);
    return post;
  }
});

Template.postItem.events({
  'click .upvotable': function(e){
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});

//Template.postItem.onCreated(function(){
//  this._id = FlowRouter.current().params._id;
//  this.post = MS.collections.posts.find({_id: this._id});
//  console.log(this);
//});