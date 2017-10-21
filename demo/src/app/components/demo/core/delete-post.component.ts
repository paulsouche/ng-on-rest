import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostClient, PostDeleteComponent, PostResource } from '../../../interfaces/components/posts';
import { IPostDto } from '../../../interfaces/dtos/posts';

@Component({
  selector: 'demo-core-delete-post',
  template: `
    <h4>{{ 'posts.deleteTitle' | translate }} {{entity.title}} ?</h4>
    <form class="mt-5" (submit)="submit()">
      <div class="for-group text-right">
        <a class="btn btn-secondary mr-4" routerLink="/core/posts">
          {{'posts.cancel' | translate}}
        </a>
        <button type="submit" class="btn btn-primary">
          {{'posts.delete' | translate}}
        </button>
      </div>
    </form>
    <markdown [path]="'demo.core.delete' | translate"></markdown>
  `,
})
export class DemoCoreDeletePostComponent implements PostDeleteComponent {
  public resource: PostResource;
  public client: PostClient;
  public entity: IPostDto;
  public step: string;

  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  public submit() {
    return this.client.delete(this.entity)
      .then(() => this._router.navigate(['core/posts']));
  }
}
