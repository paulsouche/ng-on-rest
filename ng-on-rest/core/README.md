ng-on-rest-core
========

This module allows you to transform your angular application in a REST admin

First of all you need to install the dependency using `yarn` or `npm`.

```bash
  npm install ng-rest-core -S
  yarn add ng-rest-core
```

The package comes with different bundles

 - umd
 - esm5
 - esm2015

Thanks to [ng-packagr](https://github.com/dherges/ng-packagr). So feel free to use what suits you best.

Additionaly, you will find [typedoc](https://github.com/TypeStrong/typedoc) documentation in docs folder.

Usage
========

### Configuration
___

First, the module must be imported

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

Let's see what this code does

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
It imports `NgorCoreModule` with `posts` resource served by [JSONPlaceholder](http://jsonplaceholder.typicode.com/).

You tell the module what component to display on each administrative action.

The application router is configured this way

`posts` => `PostsComponent`

`posts/create` => `CreatePostComponent`

`posts/{id}` => `EditPostComponent`

`posts/{id}/delete` => `DeletePostComponent`

By default router will display a `NgorBaseComponent` on each route matching pattern

`:resource/:stepOrId?/:step?`

This component will look in resource component lists. 2 possibilities

1\. `:resource` parameter only is present => it takes `list` component

2\. `:stepOrId` parameter is present => 2 new possibilities

1\. `:stepOrId` parameter matches a components list key => it takes key component

2\. `:stepOrId` parameter does not match a component key => it takes it as an id, request corresponding entity and 2 new possibilities

1\. `:step` parameter is missing => it takes `detail` component

2\. `:step` parameter is present => it takes component matching step

**If the component to display is not found or if the request fails, base component will prevent route of activate.**

If it founds the component, it's dynamically compiled. This is why you need to add `entryComponenents`.

```typescript
entryComponents: [
  PostsComponent,
  CreatePostComponent,
  DeletePostComponent,
  EditPostComponent,
],
```

`list` key is mandatory for a resource
`detail` is optional if no detail but mandatory for route `:resource/:id`
`create` is optional but used by convention by other modules
``delete` is purely specific here so feel free to add your steps

```typescript
components: {
  create: CreatePostComponent,
  delete: DeletePostComponent,
  detail: EditPostComponent,
  list: PostsComponent,
  myStep: MyStepComponent,
},
```

`MyStepComponent` will be loaded for routes `posts/myStep` && `posts/:id/myStep` so be aware of that and take care of your links && guards.

### Your first component
___

Let's see `PostsComponent`

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
        Create
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
              Delete
            </a>
          </td>
          <td>
            <a class="btn btn-secondary" [routerLink]="post.id">
              Edit
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

My pretty much concise advice to avoid verbosity.

```typescript
  type PostResource = INgorResource<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
  type PostClient = INgorGenericClient<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
  type PostListComponent = INgorListComponent<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;


  class PostsComponent implements PostListComponent, OnInit {
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

You'll easily understand that `CreatePostComponent`, `DeletePostComponent` and `EditPostComponent` are similar and implements respectively `INgorStepComponent`, `INgorEntityDetailComponent` and `INgorEntityStepDetailComponent`.

### Advanced usages
___

If your requests need to be authenticated, you can provide an `AuthentcatedHttp`.

```typescript
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticatedHttp extends HttpClient {
  constructor(handler: HttpHandler) {
    super(handler);
  }

  public request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>> {
    // Modify request to add authorization here
    return super.request(req);
  }
}

// ...

NgorCoreModule.forRoot({
  provideHttp: {
    provide: HttpClient,
    useClass: AuthenticatedHttp,
  },
})
```

By default ng-on-rest use `NgorGenericClient` from [ngx-resource-core](https://github.com/troyanskiy/ngx-resource-core) as REST connector and `NgorGenericHandler` as REST handler. If it does not fit your needs, you can provide your own GenericClient and your own GenericHandler. The only constraint is to implements `INgorGenericClient` and `INgorGenericHandler` interfaces. Mandatory properties of these interfaces are used in the core module and optional by other modules.

```typescript
import { INgorGenericClient } from 'ng-on-rest-core';

export class MyGenericClient<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>
  implements INgorGenericClient<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> {
    // ... Your implementation
}
```

```typescript
import { INgorGenericHandler } from 'ng-on-rest-core';

export class MyGenericHandler implements INgorGenericHandler {
    // ... Your implementation
}
```

These classes are not `@Injectable` decorated as provided by factories. You'll have to provide these factories

```typescript
function myGenericHandlerFactory(deps1, deps2) { // Your deps here
  return () => new MyGenericHandler(deps1, deps2);
}
```


```typescript
function myGenericClientFactory(deps1, deps2) { // Your deps here
  // endpoint provided by the resource
  return (endPoint: string) => new MyGenericClient(deps1, deps2, endPoint);
}
```

```typescript
import { NGOR_GENERIC_CLIENT_FACTORY, NGOR_GENERIC_HANDLER_FACTORY, NgorCoreModule } from 'ng-on-rest-core';

// ...

NgorCoreModule.forRoot({
  provideGenericClientFactory: {
    provide: NGOR_GENERIC_CLIENT_FACTORY,
    useFactory: myGenericClientFactory,
    deps: [DEPS1, DEPS2], // Your deps here
  },
  provideGenericHandlerFactory: {
    provide: NGOR_GENERIC_HANDLER_FACTORY,
    useFactory: myGenericHandlerFactory,
    deps: [DEPS1, DEPS2], // Your deps here
  },
});
```
