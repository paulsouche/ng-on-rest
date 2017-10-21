import { NgModule } from '@angular/core';
import {
  NGOR_DEBUG,
  NGOR_RESOURCE_PAGINATION_FUNC,
  NGOR_RESOURCE_QUERY_PARAMS_FUNC,
  NgorCoreModule,
} from 'ng-on-rest-core';
import { NgorCreateModule } from 'ng-on-rest-create';
import { environment } from '../../../environments/environment';
import { DemoCreatePostComponent } from '../../components/demo/create/post.component';
import { DemoCreateUserComponent } from '../../components/demo/create/user.component';
import { DemoListPostsComponent } from '../../components/demo/list/posts.component';
import { DemoListUsersComponent } from '../../components/demo/list/users.component';
import { totalCountPaginationFuncFactory } from '../../models/pagination-func.factory';
import { queryParamsFuncFactory } from '../../models/query-params-func.factory';
import { SharedModule } from '../shared.module';
import { CommonListModule } from './common-list.module';

@NgModule({
  declarations: [
    DemoCreatePostComponent,
    DemoCreateUserComponent,
  ],
  entryComponents: [
    DemoCreatePostComponent,
    DemoCreateUserComponent,
  ],
  imports: [
    SharedModule,
    CommonListModule,
    NgorCoreModule.forRoot({
      debug: {
        provide: NGOR_DEBUG,
        useValue: ! environment.production,
      },
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
            create: DemoCreatePostComponent,
            list: DemoListPostsComponent,
          },
          endPoint: 'http://jsonplaceholder.typicode.com',
          name: 'posts',
        },
        {
          components: {
            create: DemoCreateUserComponent,
            list: DemoListUsersComponent,
          },
          endPoint: 'http://jsonplaceholder.typicode.com',
          name: 'users',
        },
      ],
    }),
    NgorCreateModule.forRoot(),
  ],
})
export class DemoCreateModule { }
