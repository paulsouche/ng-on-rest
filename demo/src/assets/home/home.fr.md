# ng-on-rest
***

Le but de ce projet est de créer un admin à la demande sur une API REST. Il se compose de plusieurs modules pouvant être importés au besoin.

J'aime JavaScript (et TypeScript) et les frameworks JS en général [marmelab](https://github.com/marmelab) a développé [le même projet sur React](https://github.com/marmelab/admin-on-rest), je me suis inspiré de leur réalisation pour le porter sur angular.

Ces modules s'installent avec npm/yarn

```shell
npm install ng-on-rest-core

yarn add ng-on-rest-core
```
## ng-on-rest-core
---

C'est le module principal. Les autres modules en dépendent. Il permet de définir les resources REST à consommer et les composants associés à chaque action d'administration.

N'hésitez pas à consulter la [démo](/#/core/posts).


## ng-on-rest-list
---

Ce module exporte un composant permettant d'afficher un tableau d'entités, de le paginer, de rechercher à l'intérieur de la collection.

N'hésitez pas à consulter la [démo](/#/list/posts).

## ng-on-rest-create
---

Ce module exporte un composant permettant de créer un workflow de création d'une entité avec des formulaires génériques.

N'hésitez pas à consulter la [démo](/#/create/posts).

## ng-on-rest-detail
---

Ce module exporte un composant permettant de de consulter et d'éditer le détail d'une entité à partir de modèles génériques.

N'hésitez pas à consulter la [démo](/#/detail/posts).
