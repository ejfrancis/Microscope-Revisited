if(Meteor.isClient) {

  Template.registerHelper('pluralize', function (n, thing) {
    var res;
    if (n === 1) {
      res = '1 ' + thing;
    } else {
      res = n + ' ' + thing + 's';
    }

    return res;
  });

  //auth helpers
  Template.registerHelper('authInProcess', function () {
    return Meteor.loggingIn();
  });
  Template.registerHelper('canShow', function () {
    return !!Meteor.user();
  });

}