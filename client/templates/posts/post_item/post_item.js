Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;   
  },
  ownPost: function(){
    return this.userId === Meteor.userId();
  }
});

Template.postItem.events({
  'click .upvote': function(e){
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
