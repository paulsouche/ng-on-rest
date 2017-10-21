ng-on-rest-list
========

This module is an implementation of generic list component for `ng-on-rest`.

First of all you need to install the dependency using `yarn` or `npm`.

```bash
  npm install ng-rest-list -S
  yarn add ng-rest-list
```

The package comes with different bundles

 - umd
 - esm5
 - esm2015

Thanks to [ng-packagr](https://github.com/dherges/ng-packagr). So feel free to use what suits you best.

Additionaly, you will find [typedoc](https://github.com/TypeStrong/typedoc) documentation in docs folder.

Usage
========

This module needs ng-on-rest-core module to be configured. Please be sure to checkout [the doc](../core) first.

### Configuration
___

First, the module must be imported

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NGOR_RESOURCE_PAGINATION_FUNC,
  NGOR_RESOURCE_QUERY_PARAMS_FUNC,
  ngorContentRangePaginationFuncFactory,
  ngorFilterRangeSortQueryParamsFuncFactory,
  NgorCoreModule,
} from 'ng-on-rest-core';
import { NgorListModule } from 'ng-on-rest-list';
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
    NgorListModule.forRoot(),
    NgorCoreModule.forRoot({
      provideQueryParamsFunc: {
        provide: NGOR_RESOURCE_QUERY_PARAMS_FUNC,
        useFactory: ngorFilterRangeSortQueryParamsFuncFactory,
      },
      providePaginationFunc: {
        provide: NGOR_RESOURCE_PAGINATION_FUNC,
        useFactory: ngorContentRangePaginationFuncFactory,
      },
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

### Pagination / Sort / Filter made easy
___

`ng-on-rest-core` comes with 2 factories

 - One for `HttpRequest` query params
 - One for update entities list pagination on an `HttpResponse`

`ngorFilterRangeSortQueryParamsFuncFactory` formats filter / range / sort queryParams
`ngorContentRangePaginationFuncFactory` reads `Content-range` response header to update pagination

You'll certainly need to create your own factories. Let's see examples on how.

```typescript
// Pagination
import { HttpResponse } from '@angular/common/http';
import { INgorResourceListPagination, TNgorPaginationFuncCurry } from 'ng-on-rest-core';

export function totalCountPaginationFuncFactory(/* Deps here if needed */): TNgorPaginationFuncCurry {
  return (pagination: INgorResourceListPagination) =>
    (res: HttpResponse<any>) => {
      const headers = res.headers;
      if (headers) {
        const totalCount = headers.get('X-Total-Count');
        if (totalCount) {
          pagination.total = parseInt(totalCount.split('/').pop() || '0', 10);
        }
      }
    };
}

// Query
import { INgorResourceListArgs, INgorResourceListParams, TNgorQueryParamsFuncCurry } from 'ng-on-rest-core';

export function queryParamsFuncFactory(/* Deps here if needed */): TNgorQueryParamsFuncCurry {
  return (args: INgorResourceListArgs) =>
    (params: INgorResourceListParams) => {
      const filter: { [key: string]: string } = {};
      const [_start, _end] = args.pagination.getRange(params.page, params.range);
      const _order = args.sort.order || 'DESC';
      const _sort = args.sort.property || 'id';
      if (params.filter) {
        params.filterParams.forEach((p) => filter[p.key] = params.filter);
      }
      return {
        ...filter,
        _end: _end + 1,
        _order,
        _sort,
        _start,
      };
    };
}
```

### Datagrid
___

`PostsComponent` evolved quite a bit.

```typescript
import { Component } from '@angular/core';
import { PostClient, PostListComponent, PostResource } from '../../../interfaces/components/posts';

@Component({
  selector: 'posts',
  template: `
    <ngor-datagrid>
      <ngor-datagrid-column property="id" sortable="true">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="userId" sortable="true">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="title">
      </ngor-datagrid-column>
      <ngor-datagrid-column title="body">
        <ng-template let-post>
          <p>
            {{post.body}}
          </p>
        </ng-template>
      </ngor-datagrid-column>
    </ngor-datagrid>
  `,
})
export class PostsComponent implements PostListComponent {
  public resource: PostResource;
  public client: PostClient;
}
```

This component will display a pagination bar, a pagination range select and a table with 4 columns `ìd` and `userId` are sortable.

##### Templating / Pipes

If your cell needs a custom template, just provide a `ng-template`

```html
<ng-template let-post>
  <p>
    {{post.body | yourPipe}}
  </p>
</ng-template>
```

##### Filter

To add a search Bar to the component, you have to input a `filterParams` key

```typescript
import { Component } from '@angular/core';
import { PostClient, PostListComponent, PostResource } from '../../../interfaces/components/posts';
import { INgorFilterParameter } from 'ng-on-rest-core';

@Component({
  selector: 'demo-list-posts',
  template: `
    <ngor-datagrid [filterParams]="filterParams">
      <ngor-datagrid-column property="id" sortable="true">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="userId" sortable="true">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="title">
      </ngor-datagrid-column>
      <ngor-datagrid-column title="body">
        <ng-template let-post>
          <p>
            {{post.body}}
          </p>
        </ng-template>
      </ngor-datagrid-column>
    </ngor-datagrid>
  `,
})
export class PostsComponent implements PostListComponent {
  public resource: PostResource;
  public client: PostClient;
  public filterParams: INgorFilterParameter[] = [{
    key: 'title',
    map: (value) => value.substr(0,5),
  }];
}
```

`map` is optional but useful when searchBar input & filterParams are passed to the queryParams function

##### Pagination / Ranges

You can change pagination bar size / range selction values via the forRoot module's method.

```typescript
import { NGOR_ENTITIES_RANGES, NGOR_PAGINATION_SIZE } from 'ng-on-rest-list';


NgorListModule.forRoot({
  provideEntitiesRanges: {
    provide: NGOR_ENTITIES_RANGES,
    useValue: [50, 100, 200, 500],
  },
  providePaginationSize: {
    provide: NGOR_PAGINATION_SIZE,
    useValue: 10,
  },
}),
```

##### i18n

You can provide i18n `labels` via `ngor-datagrid` input see `INgorDatagridLabels` interface for help. These will be translated thanks to [ngx-translate](https://github.com/ngx-translate/core).

