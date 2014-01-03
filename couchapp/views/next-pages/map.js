function(doc) {
  if (doc.title && doc.body) {
    emit(doc.previous, doc);
  }
}