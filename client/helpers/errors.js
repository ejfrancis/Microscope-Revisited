//local errors collection, null name since it's never on the server
Errors = new Mongo.Collection(null);

ClientErrors = {
  throwError: function(message){
    Errors.insert({message: message});
  }
}
