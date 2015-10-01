// check that the userId specified owns the documents
MS.permissions.ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};
