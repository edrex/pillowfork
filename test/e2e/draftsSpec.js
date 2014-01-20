function expectPageContents(draft) {
    expect($('#title').getText()).toBe(draft.title);
    expect($('#body').getText()).toBe(draft.body);    
}

function testDraftCreate(draft) {
    browser.get('');
    // expect($('#draft-link').getText()).toBe('');

    $('#draft-link').click();
    expectPageContents({title: '', body: ''});
    $('#title').click();
    $('#title').sendKeys(draft.title);
    $('#body').click();
    $('#body').sendKeys(draft.body);
    expectPageContents(draft);
    browser.navigate().back();
    expect($('#draft-link').getText()).toBe(draft.title);

    $('#draft-link').click();
    expectPageContents(draft);
}

describe('Drafts', function() {
    afterEach(function() {
        browser.executeScript(function(){
            PouchDB.destroy('pillowfork-drafts');
        });
    })
    it('should allow editing title and body', function() {
        testDraftCreate({
            title: 'Foo page',  
            body: 'Foo body'
        });
    });

    it('should save a draft after the first key press', function() {
        testDraftCreate({
            title: 'F',  
            body: ''
        });
    });
});
