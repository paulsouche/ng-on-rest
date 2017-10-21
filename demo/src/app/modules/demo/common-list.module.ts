import { NgModule } from '@angular/core';
import { NgorListModule } from 'ng-on-rest-list';
import { DemoListPostsComponent } from '../../components/demo/list/posts.component';
import { DemoListUsersComponent } from '../../components/demo/list/users.component';

@NgModule({
  declarations: [
    DemoListPostsComponent,
    DemoListUsersComponent,
  ],
  entryComponents: [
    DemoListPostsComponent,
    DemoListUsersComponent,
  ],
  exports: [
    NgorListModule,
    DemoListPostsComponent,
    DemoListUsersComponent,
  ],
  imports: [
    NgorListModule.forRoot(),
  ],
})
export class CommonListModule { }
