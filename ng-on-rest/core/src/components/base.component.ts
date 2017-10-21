import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResourceRouteParams } from '../interfaces/resources/resource-route-params';
import { NgorResourceComponentsService } from '../services/resource-components.service';

@Component({
  providers: [
    NgorResourceComponentsService,
  ],
  selector: 'ngor-base',
  template: `
    <ng-template #template><ng-template>
  `,
})
export class NgorBaseComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto> implements OnInit {
  @ViewChild('template', {
    read: ViewContainerRef,
  })
  public viewContainerRef: ViewContainerRef;

  private _route: ActivatedRoute;
  private _location: Location;
  private _resourceComponentsService: NgorResourceComponentsService<Qry, Prms, ECrteDto, EUpdteDto, EDto>;

  constructor(
    route: ActivatedRoute,
    location: Location,
    resourceComponentsService: NgorResourceComponentsService<Qry, Prms, ECrteDto, EUpdteDto, EDto>) {
    this._route = route;
    this._location = location;
    this._resourceComponentsService = resourceComponentsService;
  }

  public ngOnInit() {
    this._route.params
      .subscribe((p: IResourceRouteParams) => this._resourceComponentsService
        .createComponent(p, this.viewContainerRef)
        .catch(() => this._location.back()));
  }
}
