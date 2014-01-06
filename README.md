# pillowfork 

Pillowfork is an experiment in collaborative writing experiment, where anyone can create alternate branches of a narrative work. You might use it for:

 - Free-form writing in a crazy group brainstorm
 - Exploring concurrent events

## Fun stuff

 - Updates are shown immediately to all connected browsers, enabling realtime "story ping-pong".
 - Supports fully offline authoring and browsing, so you can take it with you to the park. Changes sync next time you get a connection.
 - Mobile-first. Works great on smartphones.

## Technical stuff

 - It is discoursive, which means that pages are immutable once they are published. This isn't enforced by the server, rather it is ensured by the fact that the page IDs are cryptographic hashes of their contents.
 - Built using CouchDB, PouchDB, and AngularJS

## Get involved

 - Contribute to a story on <http://pillowfork.com>
 - [Roadmap on Trello](https://trello.com/b/vGDutzqN/pillow-fork)

## Installation

You will need a couchdb to work with. It should have the browserid plugin installed and enabled. Iriscouch works, or you can build your own for local usage. I `brew install couchdb` and then build the plugin separately using [this branch](https://github.com/iriscouch/browserid_couchdb/pull/25) (mine).

You will need the `erica` couchapp cli, which must be built using Erlang. There are also python (couchapp/couchapp) and node (grunt-couch) implementations which work just fine, but they don't detect unchanged attachments and so are much slower in development. Using those would require some small changes to the Gruntfile.

```
npm install -g grunt-cli
npm install
# pulls down webdriver stuff
grunt install
```
