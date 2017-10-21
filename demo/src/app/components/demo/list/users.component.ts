import { Component } from '@angular/core';
import { UserClient, UserListComponent, UserResource } from '../../../interfaces/components/users';

@Component({
  selector: 'demo-list-posts',
  template: `
    <ngor-datagrid [filterParams]="filterParams">
      <ngor-datagrid-column property="id" sortable="true">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="name" title="demo.forms.users.name" sortable="true">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="email">
      </ngor-datagrid-column>
    </ngor-datagrid>
  `,
})
export class DemoListUsersComponent implements UserListComponent {
  public resource: UserResource;
  public client: UserClient;
  public filterParams = [{ key: 'email' }];
}
