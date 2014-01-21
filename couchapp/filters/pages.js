function(doc, req) {
  return !!((doc.title && doc.body) || doc._deleted);
}