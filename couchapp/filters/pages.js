function(doc, req) {
  return !!(doc.type == 'page' || doc._deleted);
}