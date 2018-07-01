#RESTful Routes

  Name     URL              Verb     Description
====================================================
* INDEX    /dogs            GET      Display a list of all dogs
* NEW      /dogs/new        GET      Display form to make new dog
* CREATE   /dogs            POST     Create a new dog, then redirect somewhere
* SHOW     /dogs/:id        GET      Shows info about one dog
* EDIT     /dogs/:id/edit   GET      Show edit form for one dog
* UPDATE   /dogs/:id        PUT      Update a particular dog, then redirect somewhere
* DELETE   /dogs/:id        DELETE   Delete a particular dog, then redirect somewhere

--------------------------------------------------------------------------------

REST - REpresentational State Transfer

* Mapping between HTTP routes and CRUD (Create, Read, Update, Delete)
* Fixes specific pattern for placing routes