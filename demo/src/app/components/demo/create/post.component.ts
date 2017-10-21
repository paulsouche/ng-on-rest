import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { PostClient, PostCreateComponent, PostResource } from '../../../interfaces/components/posts';

@Component({
  selector: 'demo-create-post',
  template: `
    <h4>{{ 'posts.createTitle' | translate }}</h4>
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
export class DemoCreatePostComponent implements PostCreateComponent {
  public resource: PostResource;
  public client: PostClient;
  public step: string;
  public model: TNgorFormModel = [
    {
      id: 'title',
      label: 'demo.forms.posts.title',
      required: true,
      type: 'INPUT',
    },
    {
      id: 'body',
      label: 'demo.forms.posts.body',
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
