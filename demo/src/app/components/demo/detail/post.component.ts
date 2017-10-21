import { Component } from '@angular/core';
import { INgorEntityDetailColumn, INgorUpdateEntityLabels } from 'ng-on-rest-detail';
import { PostClient, PostDetailComponent, PostResource } from '../../../interfaces/components/posts';
import { IPostDto } from '../../../interfaces/dtos/posts';

@Component({
  selector: 'demo-detail-post',
  styles: [`
    /deep/ label {
      font-weight: bold;
    }

    /deep/ label + div {
      margin-bottom: 1em;
    }
  `],
  template: `
     <ngor-update-entity [columns]="columns" [labels]="labels">
       <img src="/assets/img/post.jpg" alt="POST">
     </ngor-update-entity>
  `,
})
export class DemoDetailPostComponent implements PostDetailComponent {
  public resource: PostResource;
  public client: PostClient;
  public entity: IPostDto;
  public step: string;

  public labels: INgorUpdateEntityLabels = {
    title: 'posts.detailTitle',
  };

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
