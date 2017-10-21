import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <a class="navbar-brand" routerLinkActive="active" routerLink="/home">
        {{'menu.brand' | translate}}
      </a>
      <button class="navbar-toggler navbar-toggler-right" type="button" (click)="isCollapsed = !isCollapsed">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container">
        <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" routerLinkActive="active">
              <a class="nav-link" routerLink="/core/posts">
                {{'menu.core' | translate}}
              </a>
            </li>
            <li class="nav-item" routerLinkActive="active" ngbDropdown>
              <a class="nav-link" id="listDropdown" ngbDropdownToggle>
                {{'menu.list' | translate}}
              </a>
              <div ngbDropdownMenu aria-labelledby="listDropdown">
                <a class="dropdown-item" routerLink="/list/posts">
                  {{'menu.posts' | translate}}
                </a>
                <a class="dropdown-item" routerLink="/list/users">
                  {{'menu.users' | translate}}
                </a>
              </div>
            </li>
            <li class="nav-item" routerLinkActive="active" ngbDropdown>
              <a class="nav-link" id="listDropdown" ngbDropdownToggle>
                {{'menu.create' | translate}}
              </a>
              <div ngbDropdownMenu aria-labelledby="listDropdown">
                <a class="dropdown-item" routerLink="/create/posts">
                  {{'menu.posts' | translate}}
                </a>
                <a class="dropdown-item" routerLink="/create/users">
                  {{'menu.users' | translate}}
                </a>
              </div>
            </li>
            <li class="nav-item" routerLinkActive="active" ngbDropdown>
              <a class="nav-link" id="listDropdown" ngbDropdownToggle>
                {{'menu.detail' | translate}}
              </a>
              <div ngbDropdownMenu aria-labelledby="listDropdown">
                <a class="dropdown-item" routerLink="/detail/posts">
                  {{'menu.posts' | translate}}
                </a>
                <a class="dropdown-item" routerLink="/detail/users">
                  {{'menu.users' | translate}}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="h-100 container-fluid">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class MenuComponent {
  public isCollapsed = true;
}
