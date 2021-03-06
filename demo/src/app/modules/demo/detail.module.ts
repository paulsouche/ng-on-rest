import { NgModule } from '@angular/core';
import {
  NGOR_RESOURCE_PAGINATION_FUNC,
  NGOR_RESOURCE_QUERY_PARAMS_FUNC,
  NgorCoreModule,
} from 'ng-on-rest-core';
import { NgorDetailModule } from 'ng-on-rest-detail';
import { DemoDetailPostComponent } from '../../components/demo/detail/post.component';
import { DemoDetailUserComponent } from '../../components/demo/detail/user.component';
import { DemoListPostsComponent } from '../../components/demo/list/posts.component';
import { DemoListUsersComponent } from '../../components/demo/list/users.component';
import { totalCountPaginationFuncFactory } from '../../models/pagination-func.factory';
import { queryParamsFuncFactory } from '../../models/query-params-func.factory';
import { SharedModule } from '../shared.module';
import { CommonListModule } from './common-list.module';

@NgModule({
  declarations: [
    DemoDetailPostComponent,
    DemoDetailUserComponent,
  ],
  entryComponents: [
    DemoDetailPostComponent,
    DemoDetailUserComponent,
  ],
  imports: [
    SharedModule,
    CommonListModule,
    NgorCoreModule.forRoot({
      providePaginationFunc: {
        provide: NGOR_RESOURCE_PAGINATION_FUNC,
        useFactory: totalCountPaginationFuncFactory,
      },
      provideQueryParamsFunc: {
        provide: NGOR_RESOURCE_QUERY_PARAMS_FUNC,
        useFactory: queryParamsFuncFactory,
      },
      resources: [
        {
          components: {
            detail: DemoDetailPostComponent,
            list: DemoListPostsComponent,
          },
          endPoint: 'http://jsonplaceholder.typicode.com',
          name: 'posts',
        },
        {
          components: {
            detail: DemoDetailUserComponent,
            list: DemoListUsersComponent,
          },
          endPoint: 'http://jsonplaceholder.typicode.com',
          name: 'users',
        },
      ],
    }),
    NgorDetailModule.forRoot(),
  ],
})
export class DemoDetailModule { }
