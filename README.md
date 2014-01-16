# Pillowfork

This is the source code for [pillowfork.com](http://pillowfork.com/).
Pillowfork is a collaborative story-telling experiment encouraging writers take stories in new directions. Anyone can contribute new pages to a story. Each page forms a new branch expanding into branching alternate versions of a narrative work.

## Uses

 - Choose (y)our own adventure
 - Story Ping-Pong
 - Collaborative Fan-fiction
 - Multi-POV narrative
 - Exploring concurrent events
 - Group brainstorming
 - ________

## Technology

Pillowfork is a [CouchApp](http://guide.couchdb.org/editions/1/en/standalone.html). One advantage of this approach is that multiple instances of the app can **federate**, sharing content back and forth seamlessly.
The vast majority of the app code is “client-side”, which is to say that it runs in the user’s browser rather than on the server. Data from the server is synchronized with each client, and stored in client-side storage (see [IndexedDB](https://developer.mozilla.org/en-US/docs/IndexedDB)) if available. Additionally, draft content is stored in the author’s browser (this works even in older browsers) until the author is ready to publish it. This enables two interesting modes:

 - **Offline**: The site can be used fully-offline, including authoring. The only action which requires a net connection is publishing a finished page. Take it to the park. Changes sync next time you get a connection.
 - **Real-time collaboration**: New pages are sent immediately to other connected browsers immediately, enabling games like **story ping-pong** and **story swarm**.
 - **Mobile-first**: Works great on smartphones.

## Theory

Pillowfork uses a data structure which is similar to that used by [Git](http://www-cs-students.stanford.edu/~blynn/gitmagic/ch08.html#_the_object_database). 

 - **Pages** are the basic building block of a story. Each page (except the first page of a story) has one or more predecessor.
 - Pages are [content addressable](http://en.wikipedia.org/wiki/Content-addressable_storage) via a **SHA1 hash**. This makes them immutable, supporting **discourse** with **no take-backs**. This technology is important for the future of distributed social systems. Check out [Camlistore](http://camlistore.org/) to for more theory.
 - The pages in a story form **a tree** (technically an acyclic directed graph, due to the multi-parent allowance), rooted at the first page.

## Get involved

 - Contribute to a story on <http://pillowfork.com>
 - [Roadmap on Trello](https://trello.com/b/vGDutzqN/pillow-fork)

## Installation

## Prereqs

 1. Install or provision a CouchDB instance.
  - Iriscouch works, but we found the free plan to be too unreliable. 
  - For local development on OSX, we use `brew install couchdb` (installs quick with Erlang from a “bottle”).
  - Ubuntu: Pillowfork.com is running Ubuntu Precise with the CouchDB packages from [this PPA](https://launchpad.net/~cli/+archive/couchdb). More recent Ubuntu releases have up-to-date CouchDB packages.
 2. Build the BrowserID authentication plugin to support passwordless signin. Use [this branch](https://github.com/iriscouch/browserid_couchdb/pull/25). TODO: more detail and maybe a pre-built copy of the plugin.
 3. Prereqs for building the CouchApp, only needed on your dev machine:
 - Node.JS
 - `erica` couchapp cli, which must be built using Erlang and rebar. There are also Python (couchapp/couchapp) and Node.js (grunt-couch) implementations, which work fine but do full upload on each run and so are much slower in development. 

TODO: these install instructions are out of date. I’m transitioning to Gulp as the task runner.

```
npm install -g grunt-cli gulp
npm install
# pulls down webdriver stuff
grunt install
```

*Happy forking!*
