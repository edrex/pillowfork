describe('Drafts', function() {
  it('should allow editing title and body', function() {
    browser.get('/');

    expect($('#new-page').isDisplayed()).toBe(true);
    expect($('#draft-page').isDisplayed()).toBe(false);

    $('#new-page').click();
    $('#draftTitle').click();
    $('#draftTitle').sendKeys("Foo");
    $('#draftBody').click();
    $('#draftBody').sendKeys("Bar");
    expect($('#draftTitle').getText()).toBe('Foo');
    expect($('#draftBody').getText()).toBe('Bar');

    // Check that saving locally works
    // Back
    browser.navigate().back();

    // check new page is hidden and draft is shown
    // check draft title
  });
});
