import { Component, OnInit } from '@angular/core';
import { PostClient, PostListComponent, PostResource } from '../../../interfaces/components/posts';
import { IPostDto } from '../../../interfaces/dtos/posts';

@Component({
  selector: 'demo-core-posts',
  template: `
    <h1>{{'posts.title' | translate}}</h1>
    <header class="d-flex justify-content-end mb-5">
      <a class="btn btn-primary" routerLink="create">
        {{'posts.create' | translate}}
      </a>
    </header>
    <ng-container *ngIf="posts">
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
                {{'posts.delete' | translate}}
              </a>
            </td>
            <td>
              <a class="btn btn-secondary" [routerLink]="post.id">
                {{'posts.edit' | translate}}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <markdown [path]="'demo.core.list' | translate"></markdown>
    </ng-container>
  `,
})
export class DemoCorePostsComponent
  implements PostListComponent, OnInit {
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
