Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPost = MS.collections.posts.findOne(FlowRouter.getParam('_id'));

    var currentPostData = {
      url: currentPost.url,
      title: currentPost.title
    };

    var updatedPost = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = MS.collections.posts.validatePost(updatedPost);
    if (errors.title || errors.url) {
      return Session.set('postEditErrors', errors);
    }

    var currentPostId = FlowRouter.getParam('_id');

    Meteor.call('postEdit', currentPostId,  currentPostData, updatedPost, function(err,result){
      if(err){
        return Errors.throw(error.reason);
      }

      if(result.postExists){
        Errors.throw('This link has already been posted');
      }

      FlowRouter.go('postPage', { _id: result._id});
    })
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      MS.collections.posts.remove(currentPostId);
      FlowRouter.go('home');
    }
  }
});

Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
  post: function(){
    return MS.collections.posts.findOne(FlowRouter.getParam('_id'));
  },
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    //if there is an error for this field, return error class, otherwise return no class
    return !!Session.get('postEditErrors')[field] ?
      'has-error' :
      '';
  }
});