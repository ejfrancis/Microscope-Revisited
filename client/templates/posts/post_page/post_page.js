Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this.postId() });
  },

  postId: function(){
    return FlowRouter.getParam('_id');
  }
});
