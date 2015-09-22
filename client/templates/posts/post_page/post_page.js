Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: FlowRouter.current().params._id });
  },

  postId: function(){
    return FlowRouter.current().params._id;
  }
});
