// Write your package code here!
if(Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

}