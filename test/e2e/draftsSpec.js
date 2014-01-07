describe('Drafts', function() {
  it('should allow editing title and body', function() {
    browser.get('/');
    $('#new-page').click();
    $('#draftTitle').click();
    $('#draftTitle').sendKeys("Foo");
    $('#draftBody').click();
    $('#draftBody').sendKeys("Bar");
    expect($('#draftTitle').getText()).toBe('Foo');
    expect($('#draftBody').getText()).toBe('Bar');
  });
});
