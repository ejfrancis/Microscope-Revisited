Tinytest.add('Errors - adds to collection', function(test){
  test.equal(Errors.collection.find({}).count(), 0);

  Errors.throw('some error');
  test.equal(Errors.collection.find({}).count(), 1);

  Errors.collection.remove({});
});

Tinytest.addAsync('Errors - template renders and removes error after timeout', function(test,done){
  Errors.throw('a new error');
  test.equal(Errors.collection.find({}).count(), 1);

  //render the template
  UI.insert(UI.render(Template.meteorErrors), document.body);

  //for for UI to render, after 3.5 seconds the error should be removed
  Meteor.setTimeout(function(){
    test.equal(Errors.collection.find({}).count(), 0);
    done();
  }, 3500)
});