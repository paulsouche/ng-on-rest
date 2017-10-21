Cette page a été générée avec **ng-on-rest-core**. Voyons comment !

## Configuration de base
---

Tout d'abord, vous devez importer le module dans votre application

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgorCoreModule } from 'ng-on-rest-core';
import { AppComponent } from './components/app.component';
import { CreatePostComponent } from './components/create-post.component';
import { DeletePostComponent } from './components/delete-post.component';
import { EditPostComponent } from './components/edit-post.component';
import { PostsComponent } from './components/posts.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    PostsComponent,
    CreatePostComponent,
    DeletePostComponent,
    EditPostComponent,
  ],
  entryComponents: [
    PostsComponent,
    CreatePostComponent,
    DeletePostComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    NgorCoreModule.forRoot({
      resources: [
        {
          components: {
            create: CreatePostComponent,
            delete: DeletePostComponent,
            detail: EditPostComponent,
            list: PostsComponent,
          },
          endPoint: 'http://jsonplaceholder.typicode.com',
          name: 'posts',
        },
      ],
    }),
  ],
})
export class AppModule { }
```

Décomposons maintenant le code ci-dessus

```typescript
NgorCoreModule.forRoot({
  resources: [
    {
      components: {
        create: CreatePostComponent,
        delete: DeletePostComponent,
        detail: EditPostComponent,
        list: PostsComponent,
      },
      endPoint: 'http://jsonplaceholder.typicode.com',
      name: 'posts',
    },
  ],
}),
```
Vous importez le module `NgorCoreModule` avec une resource `posts` qui est servie par [JSONPlaceholder](http://jsonplaceholder.typicode.com/).

Vous indiquez au module quels sont les composants à afficher sur les différentes actions d'administration.

Ce dernier va alors configurer le router de votre application de la manière suivante

`posts` => PostsComponent

`posts/create` => CreatePostComponent

`posts/{id}` => EditPostComponent

`posts/{id}/delete` => DeletePostComponent

En fait le routeur est configuré pour afficher un composant `NgorBaseComponent` sur chaque route matchant le pattern

`:resource/:stepOrId?/:step?`

Ce composant va alors rechercher dans les resources le catalogue de composant correspondant. 2 possibiltés

1. Seul le paramètre `:resource` est présent => il prend le composant `list`
2. Le paramètre `:stepOrId` est présent => 2 nouvelles possibilités


1. Le paramètre `:stepOrId` correspond à une clé du catalogue => il prend le composant de la clé
2. Le paramètre `:stepOrId` correspond à un id => il requête l'entité correspondante puis 2 nouvelles possibilités


1. Le paramètre `:step` est absent => il prend le composant `detail`
2. Le paramètre `:step` est présent => il prend le composant correspondant à la step

**Si le composant à afficher dynamiquement n'est pas trouvé ou si la requête de l'entité échoue, le composant empêchera la route de s'activer.**

Si le composant est trouvé, il est alors compilé dynamiquement. C'est pourquoi il faut ajouter vos composants aux `entryComponenents` de votre module.

```typescript
entryComponents: [
  PostsComponent,
  CreatePostComponent,
  DeletePostComponent,
  EditPostComponent,
],
```

## Votre premier composant
---

Une fois le module configuré, intéressons nous au composant `PostsComponent`

```typescript
import { Component, OnInit } from '@angular/core';
import { INgorGenericClient, INgorListComponent, INgorResource } from 'ng-on-rest-core';
import {
  IPostCreateDto,
  IPostDto,
  IPostParams,
  IPostQueryParams,
  IPostUpdateDto,
} from '../interfaces/dtos/posts';

@Component({
  selector: 'posts',
  template: `
    <h1>Posts</h1>
    <header class="d-flex justify-content-end mb-5">
      <a class="btn btn-primary" routerLink="create">
        Créer
      </a>
    </header>
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>userId</th>
          <th>title</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tfoot></tfoot>
      <tbody>
        <tr *ngFor="let post of posts">
          <td>{{post.id}}</td>
          <td>{{post.userId}}</td>
          <td>{{post.title}}</td>
          <td>
            <a class="btn btn-secondary" [routerLink]="post.id + '/delete'">
              Supprimer
            </a>
          </td>
          <td>
            <a class="btn btn-secondary" [routerLink]="post.id">
              Editer
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class PostsComponent
  implements INgorListComponent<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>, OnInit {
  public resource: INgorResource<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
  public client: INgorGenericClient<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
  public posts: IPostDto[];

  public ngOnInit() {
    this.client.query({
      _end: 5,
      _start: 0,
    })
      .then((p) => this.posts = p);
  }
}
```

**Wow !!! Mais c'est vachement verbeux le truc !**

Alors oui car c'est écrit en TypeScript et que le client Http à besoin de connaitre les dtos.

Donc soit vous n'appreciez pas TypeScript et auquel cas, vous pouvez supprimer les implémentations et les types par quelques `any` bien placés (auquel cas vous perdrez le typage dans l'utilisation des composants du module) soit vous appréciez ce language et mon conseil est de créer un type pour vos resources et vos clients pour éviter de se trimbaler les génériques à chaque fois.

```typescript
  type PostResource = INgorResource<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
  type PostClient = INgorGenericClient<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
  type PostListComponent = INgorListComponent<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;


  class DemoCorePostsComponent implements PostListComponent, OnInit {
    public resource: PostResource;
    public client: PostClient;
    public posts: IPostDto[];

    public ngOnInit() {
      this.client.query({
        _end: 5,
        _start: 0,
      })
        .then((p) => this.posts = p);
    }
  }
```

Ce qui sera beaucoup plus concis.

**Mais on doit tout faire à la main comme sans ce module**

Alors non car avant d'en arriver là, vous deviez configurer votre routeur et générer vos clients REST ce qui n'est pas anodin... Et puis **disclaimer** les autres modules vont nous aider à réaliser des composants standards plus rapidement.

Pour être plus précis, je n'ai jamais voulu imposer une librairie faisant le café avec laquelle il faut tout prendre ou tout laisser. Vous êtes libres de composer l'application de votre choix **ng-on-rest** est juste là pour vous aider à la configurer.
