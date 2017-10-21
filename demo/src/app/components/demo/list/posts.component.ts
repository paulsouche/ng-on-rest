import { Component } from '@angular/core';
import { PostClient, PostListComponent, PostResource } from '../../../interfaces/components/posts';

@Component({
  selector: 'demo-list-posts',
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
export class DemoListPostsComponent implements PostListComponent {
  public resource: PostResource;
  public client: PostClient;
}
