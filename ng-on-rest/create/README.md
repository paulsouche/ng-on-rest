ng-on-rest-create
========

This module is an implementation of generic create component for `ng-on-rest`

First of all you need to install the dependency using `yarn` or `npm`.

```bash
  npm install ng-rest-create -S
  yarn add ng-rest-create
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
import { NgorCreateModule } from 'ng-on-rest-create';
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
    NgorCreateModule.forRoot(),
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

### Create Component

`CreatePostComponent` evolved quite a bit.

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { PostClient, PostCreateComponent, PostResource } from '../../../interfaces/components/posts';

@Component({
  selector: 'create-post',
  template: `
    <h4>Create a post</h4>
    <div class="row justify-content-center">
      <div class="col-6">
        <ngor-create-entity (onCreate)="goBack()">
          <ngor-create-entity-step [model]="model">
          </ngor-create-entity-step>
        </ngor-create-entity>
      </div>
    </div>
  `,
})
export class CreatePostComponent implements PostCreateComponent {
  public resource: PostResource;
  public client: PostClient;
  public step: string;
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

  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  public goBack() {
    this._router.navigate(['create/posts']);
  }
}
```

`ng-on-rest-create` uses [@ng-dynamic-forms](https://github.com/udos86/ng-dynamic-forms) to create Dynamic forms. `TNgorFormModel` is just a type that wraps its API and make easier create models. You can create models like you do with `DynamicFormsCoreModule`. `ng-on-rest-create` pass your model as a [JSON Form model](https://github.com/udos86/ng-dynamic-forms#json-form-models).

**Limitations**

You cannot use [custom templates](https://github.com/udos86/ng-dynamic-forms#custom-templates) for now. We are looking for a solution. But you can make custom form groups (see below).

`NgorFormsModule` imports `DynamicFormsNGBootstrapUIModule` so you can use it only with `ngBootstrap` for now.  [@ng-dynamic-forms](https://github.com/udos86/ng-dynamic-forms) exports a lot of ui libraries connectors but we don't support it yet.

### Creation workflow made easy

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { PostClient, PostCreateComponent, PostResource } from '../../../interfaces/components/posts';

@Component({
  selector: 'create-post',
  template: `
    <h4>Create a post</h4>
    <div class="row justify-content-center">
      <div class="col-6">
        <ngor-create-entity (onCreate)="goBack()">
          <ngor-create-entity-step [model]="detailModel">
          </ngor-create-entity-step>
          <ngor-create-entity-step [model]="userModel">
          </ngor-create-entity-step>
        </ngor-create-entity>
      </div>
    </div>
  `,
})
export class CreatePostComponent implements PostCreateComponent {
  public resource: PostResource;
  public client: PostClient;
  public step: string;
  public detailModel: TNgorFormModel = [
    {
      id: 'title',
      label: 'Title',
      required: true,
      type: 'INPUT',
    },
    {
      id: 'body',
      label: 'Body',
      type: 'TEXTAREA',
    },
  ];

  public userModel: TNgorFormModel = [
    {
      id: 'userId',
      label: 'User',
      required: true,
      type: 'INPUT',
    },
  ];

  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  public goBack() {
    this._router.navigate(['create/posts']);
  }
}
```

This will create a `beardcrumb` on top of the form and navigation between the steps.

### Custom form group

TODO

### i18n

You can provide i18n `labels` via `ngor-create-entity` && `ngor-create-entity-step` input see `INgorCreateLabels` & `INgorCreateStepLabels` interfaces for help. These will be translated thanks to [ngx-translate](https://github.com/ngx-translate/core). It is quite mandatory for form buttons & step titles.
