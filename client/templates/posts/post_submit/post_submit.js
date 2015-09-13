Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('postInsert', post, function(err, result) {
      if(err){
        return ClientErrors.throwError(error.reason);
      }
      // show this result but route anyway
      if (result.postExists)
        ClientErrors.throwError('This link has already been posted');

      Router.go('postPage', { _id: result._id});
    });
  }
});