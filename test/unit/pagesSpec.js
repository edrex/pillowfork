describe('Pages', function() {

  beforeEach(module('app.pages'));

  // describe('pages service', function() {
  //   beforeEach(module(function ($provide) {
  //     $provide.factory('pagesdb', function(pouchdb) {
  //     return pouchdb.create('TEST_PAGES');
  //   })

  //   }));

  //   it('should test the ', inject(function(pages, $timeout) {
  //     var val;
  //     var done = false;

  //     pages.nextPages().then(function(res){
  //       val = res;
  //       done = true;
  //     }, function(err) { dump(err) });
  //     waitsFor(function(){return done})
  //     runs(function(){
  //       done = false;
  //       expect(val).toBe([])
  //       pages.add({title: 'test page', body: 'test body'})
  //       pages.nextPages().then(function(res){
  //         val = res;
  //       }).finally(function() { done = true; });
  //     })
  //     waitsFor(function(){return done})
  //     runs(function(){
  //       expect(val.length).toBe(1);
  //     })
  //   }));

  it('should whatever I don\'t care', function() {
    expect("welcome").toMatch(/welcome/i);
  });
  // });

});
