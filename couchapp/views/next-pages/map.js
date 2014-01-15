function(doc) {
  if (doc.title && doc.body) {
    if (!doc.predecessors) {
      emit (null, doc)
    } else {
      doc.predecessors.forEach(function(p){
        emit(p, doc);
      });
    }
  }
}