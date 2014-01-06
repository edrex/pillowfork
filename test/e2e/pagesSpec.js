describe('Home Page', function() {
  // this is a bullshit test
  it('should be titled pillowfork', function() {
    browser.get('/');
    expect($('h1').getText()).toBe('Pillowfork');
  });

  it('should be titled pillowfork', function() {
    browser.get('/');
    expect($('h1').getText()).toBe('Pillowfork');
  });
});
