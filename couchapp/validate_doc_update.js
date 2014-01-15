function(newDoc, oldDoc, userCtx, secObj) {
    var CryptoJS = require('views/lib/sha1').CryptoJS;

    if (!userCtx.name) {
        throw({forbidden: 'You must sign in to create pages.'});
    }

    // admins can do anything
    if (userCtx.roles.indexOf('_admin') !== -1) {
        return true;
    }

    if (newDoc._deleted === true) {
        throw({forbidden: 'Deletes are not allowed (yet).'});
    }

    if (oldDoc) {
        throw({forbidden: 'Updates are not allowed.'});
    }

    if (!newDoc.title || typeof newDoc.title !== 'string') {
        throw({forbidden: 'doc.title is required'});
    }
 
    if (!newDoc.body || typeof newDoc.body !== 'string') {
        throw({forbidden: 'doc.body is required'});
    }

    if (typeof newDoc.predecessors !== 'undefined') {
        if (!isArray(newDoc.predecessors)) {
            throw({forbidden: 'doc.predecessors must be an array'});
        }
        if (!newDoc.predecessors.every(function (e){return /^[a-z0-9]{40}$/.test(e)})) {
            throw({forbidden: 'doc.predecessors elements must be 40 char hexadecimal strings'});
        }
        newDoc.del
    }
    var id = newDoc._id;
    delete newDoc._id;
    delete newDoc._revisions;
    var hash = CryptoJS.SHA1(JSON.stringify(newDoc)).toString();
    if (id !== hash){
        throw({forbidden: 'doc._id must be the SHA1 hash of the doc. Got: '+id+' Expected: ' +hash+' Doc:' + JSON.stringify(newDoc)});
    };
}