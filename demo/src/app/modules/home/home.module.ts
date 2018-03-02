import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NgorI18nModule } from 'ng-on-rest-i18n';
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
    NgorI18nModule.forChild(),
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule { }
