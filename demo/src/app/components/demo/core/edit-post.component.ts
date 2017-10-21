import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostClient, PostDetailComponent, PostResource } from '../../../interfaces/components/posts';
import { IPostDto } from '../../../interfaces/dtos/posts';

@Component({
  selector: 'demo-core-edit-post',
  template: `
    <h4>{{ 'posts.editTitle' | translate }} {{entity.title}}</h4>
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
              {{'posts.edit' | translate}}
            </button>
          </div>
        </form>
      </div>
    </div>
    <markdown [path]="'demo.core.detail' | translate"></markdown>
  `,
})
export class DemoCoreEditPostComponent implements PostDetailComponent, OnInit {
  public resource: PostResource;
  public client: PostClient;
  public entity: IPostDto;
  public formGroup: FormGroup;

  private _formBuilder: FormBuilder;
  private _router: Router;

  constructor(formBuilder: FormBuilder, router: Router) {
    this._formBuilder = formBuilder;
    this._router = router;
  }

  public ngOnInit() {
    const entity = this.entity;
    this.formGroup = this._formBuilder.group({
      body: entity.body,
      title: [entity.title, Validators.required],
    });
  }

  public submit() {
    return this.client.save({ ...this.entity, ...this.formGroup.value })
      .then(() => this._router.navigate(['core/posts']));
  }
}
