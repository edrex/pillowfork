function(doc) {
  if (doc.type == 'page') {
    if (!doc.predecessors) {
      emit (null, doc)
    } else {
      doc.predecessors.forEach(function(p){
        emit(p, doc);
      });
    }
  }
}