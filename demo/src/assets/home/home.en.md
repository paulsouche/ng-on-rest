# ng-on-rest
***

This project main purpose is to create an admin application on top of a REST API. It is based on JavaScript modules that can be imported on demand.

I love JavaScript (and TypeScript) and JS frameworks [marmelab](https://github.com/marmelab) developped [the same project on React](https://github.com/marmelab/admin-on-rest), I took inspiration from their realization to bring it on angular.

You can install it with npm/yarn

```shell
npm install ng-on-rest-core

yarn add ng-on-rest-core
```
## ng-on-rest-core
---

This is the main module. The others modules depends on it. It defines the REST resources to consume and the components associated with each administration action.

Here is the [demo](/#/core/posts).


## ng-on-rest-list
---

This module exports a component to display an array of entities, to paginate it, to search within the collection.

Here is the [demo](/#/list/posts).

## ng-on-rest-create
---

This module exports a component to create a workflow for creating an entity with generic forms.

Here is the [démo](/#/create/posts).

## ng-on-rest-detail
---

This module exports a component allowing to consult and to edit the detail of an entity starting from generic models.

Here is the [démo](/#/detail/posts).
