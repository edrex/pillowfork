design data model
routing
get basic views working:
	page
	draft

restore authn

add authz:
 - require user
 - timestamp

Data model

pages/
  id (hash of body)
	  parentId
		title
		body
		etc
