Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPost = {
      url: this.url,
      title: this.title
    };

    var updatedPost = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var currentPostId = this._id;

    Meteor.call('postEdit', currentPostId,  currentPost, updatedPost, function(err,result){
      if(err){
        return ClientErrors.throwError(error.reason);
      }

      if(result.postExists){
        ClientErrors.throwError('This link has already been posted');
      }

      Router.go('postPage', { _id: result._id});
    })
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});