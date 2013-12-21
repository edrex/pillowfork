Here's what I'd like the data structure to look like ideally:

id:Sha1 hash of contents {
  parent: id
  body: text
  author
}

## Needs

 - Sign in with twitter

 - Key store
 - Query by parent

Possible storage layers/backends

## Firebase

 + handles signin
 - no indexing

## Express

