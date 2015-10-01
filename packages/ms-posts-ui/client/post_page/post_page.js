Template.postPage.helpers({
  comments: function() {
    return MS.collections.comments.find({postId: FlowRouter.getParam('_id') });
  },

  postId: function(){
    return FlowRouter.getParam('_id');
  }
});
