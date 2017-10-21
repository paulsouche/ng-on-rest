import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { SharedModule } from '../shared.module';

const routes: Route[] = [
  {
    component: HomeComponent,
    path: '',
  },
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule { }
