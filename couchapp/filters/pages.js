function(doc, req) {
  if ((doc.title && doc.body) || doc._deleted) return true;
}