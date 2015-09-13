Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    //validate the post, set session variables if any found, and return out
    var errors = Validation.Posts.validatePost(post);
    if(errors.title || errors.url){
      return Session.set('postSubmitErrors', errors);
    }

    Meteor.call('postInsert', post, function(err, result) {
      if(err){
        return Errors.throw(error.reason);
      }
      // show this result but route anyway
      if (result.postExists) {
        Errors.throw('This link has already been posted');
      }

      Router.go('postPage', { _id: result._id});
    });
  }
});

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    //if there is an error at this field, return the error class, otherwise return no class
    return !!Session.get('postSubmitErrors')[field] ?
      'has-error' :
      '';
  }
});

Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});