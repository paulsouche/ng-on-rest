ng-on-rest-detail
========

This module is an implementation of generic detail component for `ng-on-rest`

First of all you need to install the dependency using `yarn` or `npm`.

```bash
  npm install ng-rest-detail -S
  yarn add ng-rest-detail
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
import { NgorDetailModule } from 'ng-on-rest-detail';
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
    NgorDetailModule.forRoot(),
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

### Detail Component

`EditPostComponent` evolved quite a bit.

```typescript
import { Component } from '@angular/core';
import { INgorEntityDetailColumn } from 'ng-on-rest-detail';
import { PostClient, PostDetailComponent, PostResource } from '../../../interfaces/components/posts';
import { IPostDto } from '../../../interfaces/dtos/posts';

@Component({
  selector: 'detail-post',
  template: `
     <ngor-update-entity [columns]="columns">
       <!-- Your custom content can go here -->
     </ngor-update-entity>
  `,
})
export class DemoDetailPostComponent implements PostDetailComponent {
  public resource: PostResource;
  public client: PostClient;
  public entity: IPostDto;
  public step: string;

  public columns: Array<INgorEntityDetailColumn<IPostDto>> = [
    {
      cells: [
        {
          class: 'col-12',
          label: 'Id',
          property: 'id',
        },
        {
          class: 'col-12',
          label: 'demo.forms.posts.title',
          property: 'title',
        },
        {
          class: 'col-12',
          label: 'demo.forms.posts.body',
          property: 'body',
        },
      ],
      class: 'col-12',
    },
  ];
}
```

This will output a bootstrap card with a single column grid. `ngor-update-entity` content is available in a left card section.

### Update formular

If you input a `TNgorFormModel` in `ngor-update-entity` it will output an update formular modal containing dynamic form.

```typescript
import { Component } from '@angular/core';
import { INgorEntityDetailColumn } from 'ng-on-rest-detail';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { PostClient, PostDetailComponent, PostResource } from '../../../interfaces/components/posts';
import { IPostDto } from '../../../interfaces/dtos/posts';

@Component({
  selector: 'detail-post',
  template: `
     <ngor-update-entity [columns]="columns" [model]="model">
       <!-- Your custom content can go here -->
     </ngor-update-entity>
  `,
})
export class DemoDetailPostComponent implements PostDetailComponent {
  public resource: PostResource;
  public client: PostClient;
  public entity: IPostDto;
  public step: string;

  public columns: Array<INgorEntityDetailColumn<IPostDto>> = [
    {
      cells: [
        {
          class: 'col-12',
          label: 'Id',
          property: 'id',
        },
        {
          class: 'col-12',
          label: 'demo.forms.posts.title',
          property: 'title',
        },
        {
          class: 'col-12',
          label: 'demo.forms.posts.body',
          property: 'body',
        },
      ],
      class: 'col-12',
    },
  ];

  public model: TNgorFormModel = [
    {
      id: 'title',
      label: 'title',
      required: true,
      type: 'INPUT',
    },
    {
      id: 'body',
      label: 'body',
      type: 'TEXTAREA',
    },
  ];
}
```

### Custom form group

TODO

### i18n

You can provide i18n `labels` via `ngor-update-entity` input see `INgorUpdateEntityLabels` interface for help. These will be translated thanks to [ngx-translate](https://github.com/ngx-translate/core). It is quite mandatory for modal buttons & card title.
