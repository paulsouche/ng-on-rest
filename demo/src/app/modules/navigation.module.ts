import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../components/menu/menu.component';
import { SharedModule } from './shared.module';

const routes: Route[] = [
  {
    children: [
      {
        loadChildren: './home/home.module#HomeModule',
        path: '',
      },
    ],
    component: MenuComponent,
    path: 'home',
  },
  {
    children: [
      {
        loadChildren: './demo/core.module#DemoCoreModule',
        path: '',
      },
    ],
    component: MenuComponent,
    path: 'core',
  },
  {
    children: [
      {
        loadChildren: './demo/list.module#DemoListModule',
        path: '',
      },
    ],
    component: MenuComponent,
    path: 'list',
  },
  {
    children: [
      {
        loadChildren: './demo/create.module#DemoCreateModule',
        path: '',
      },
    ],
    component: MenuComponent,
    path: 'create',
  },
  {
    children: [
      {
        loadChildren: './demo/detail.module#DemoDetailModule',
        path: '',
      },
    ],
    component: MenuComponent,
    path: 'detail',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  declarations: [
    MenuComponent,
  ],
  exports: [
    RouterModule,
  ],
  imports: [
    NgbCollapseModule.forRoot(),
    NgbDropdownModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    SharedModule,
  ],
})
export class NavigationModule { }
