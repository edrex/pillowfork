describe('Drafts', function() {
  it('should allow editing title and body', function() {
    browser.get('');

    expect($('#new-page').isDisplayed()).toBe(true);
    expect($('#draft-page').isDisplayed()).toBe(false);

    $('#new-page').click();
    $('#title').click();
    $('#title').sendKeys("Foo");
    $('#body').click();
    $('#body').sendKeys("Bar");
    expect($('#title').getText()).toBe('Foo');
    expect($('#body').getText()).toBe('Bar');

    // Check that saving locally works
    // Back
    browser.navigate().back();

    // expect($('#new-page').isDisplayed()).toBe(false);
    // expect($('#draft-page').isDisplayed()).toBe(true);

    $('#new-page').click();
    
    expect($('#title').getText()).toBe('Foo');
    expect($('#body').getText()).toBe('Bar');
  });
});
