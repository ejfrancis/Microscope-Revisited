// check that the userId specified owns the documents
Permissions = {
  ownsDocument : function(userId, doc) {
    return doc && doc.userId === userId;
  }
};