function checkDraft(title, body) {
    expect($('#title').getText()).toBe(title);
    expect($('#body').getText()).toBe(body);    
}

describe('Drafts', function() {
  it('should allow editing title and body', function() {
    var title = 'Foo page',
        body = 'Foo body'
    browser.get('');
    // expect($('#draft-link').getText()).toBe('');

    $('#draft-link').click();
    $('#title').click();
    $('#title').sendKeys(title);
    $('#body').click();
    $('#body').sendKeys(body);
    checkDraft(title, body);
    browser.navigate().back();
    expect($('#draft-link').getText()).toBe(title);

    $('#draft-link').click();
    checkDraft(title,body);
  });
});
