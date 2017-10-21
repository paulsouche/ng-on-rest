import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgorCoreModule } from 'ng-on-rest-core';
import { DemoCoreCreatePostComponent } from '../../components/demo/core/create-post.component';
import { DemoCoreDeletePostComponent } from '../../components/demo/core/delete-post.component';
import { DemoCoreEditPostComponent } from '../../components/demo/core/edit-post.component';
import { DemoCorePostsComponent } from '../../components/demo/core/posts.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    DemoCorePostsComponent,
    DemoCoreCreatePostComponent,
    DemoCoreDeletePostComponent,
    DemoCoreEditPostComponent,
  ],
  entryComponents: [
    DemoCorePostsComponent,
    DemoCoreCreatePostComponent,
    DemoCoreDeletePostComponent,
    DemoCoreEditPostComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgorCoreModule.forRoot({
      resources: [
        {
          components: {
            create: DemoCoreCreatePostComponent,
            delete: DemoCoreDeletePostComponent,
            detail: DemoCoreEditPostComponent,
            list: DemoCorePostsComponent,
          },
          endPoint: 'http://jsonplaceholder.typicode.com',
          name: 'posts',
        },
      ],
    }),
  ],
})
export class DemoCoreModule { }
