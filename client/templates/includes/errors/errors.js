Template.errors.helpers({
  errors: function(){
    return Errors.find({});
  }
});

Template.error.onRendered(function(){
  var error = this.data;

  //remove this error after 3 seconds
  Meteor.setTimeout(function(){
    Errors.remove( error._id)
  }, 3000);
});