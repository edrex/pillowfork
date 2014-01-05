describe('Home Page', function() {
  it('should be titled pillowfork', function() {
    browser.get('/');
    expect($('h1').getText()).toBe('Pillowfork');
  });

});
