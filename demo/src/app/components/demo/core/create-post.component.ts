import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostClient, PostCreateComponent, PostResource } from '../../../interfaces/components/posts';

@Component({
  selector: 'demo-core-create-post',
  template: `
    <h4>{{ 'posts.createTitle' | translate }}</h4>
    <div class="row justify-content-center">
      <div class="col-6">
        <form [formGroup]="formGroup" (submit)="submit()">
          <div class="form-group">
            <label for="title">{{'demo.forms.posts.title' | translate}}</label>
            <input class="form-control" type="text" id="title" formControlName="title">
          </div>
          <div class="form-group">
            <label for="body">{{'demo.forms.posts.body' | translate}}</label>
            <textarea class="form-control" id="body" formControlName="body"></textarea>
          </div>
          <div class="for-group text-right">
            <button type="submit" class="btn btn-primary" [disabled]="!formGroup.valid">
              {{'posts.create' | translate}}
            </button>
          </div>
        </form>
      </div>
    </div>
    <markdown [path]="'demo.core.create' | translate"></markdown>
  `,
})
export class DemoCoreCreatePostComponent implements PostCreateComponent, OnInit {
  public formGroup: FormGroup;
  public resource: PostResource;
  public client: PostClient;
  public step: string;

  private _formBuilder: FormBuilder;
  private _router: Router;

  constructor(formBuilder: FormBuilder, router: Router) {
    this._formBuilder = formBuilder;
    this._router = router;
  }

  public ngOnInit() {
    this.formGroup = this._formBuilder.group({
      body: '',
      title: ['', Validators.required],
    });
  }

  public submit() {
    return this.client.create(this.formGroup.value)
      .then(() => this._router.navigate(['core/posts']));
  }
}
