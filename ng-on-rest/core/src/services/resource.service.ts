import { ComponentFactory, ComponentFactoryResolver, Inject, Injectable } from '@angular/core';
import { INgorBaseComponent } from '../interfaces/components/base-component';
import { INgorResourceComponents } from '../interfaces/components/resource-components';
import { INgorResource } from '../interfaces/resources/resource';
import { IResourceRouteParams } from '../interfaces/resources/resource-route-params';
import { NGOR_RESOURCES } from '../tokens/resources.token';

@Injectable()
export class NgorResourceService {
  private _resources: Array<INgorResource<any, any, any, any, any>>;
  private _resourceComponents: { [resourceName: string]: INgorResourceComponents<any, any, any, any, any> } = {};
  private _factoryResolver: ComponentFactoryResolver;

  constructor(
    factoryResolver: ComponentFactoryResolver,
    @Inject(NGOR_RESOURCES) resources: Array<INgorResource<any, any, any, any, any>>) {
    this._factoryResolver = factoryResolver;
    this._resources = resources;
    resources.forEach((r) => this.addResourceComponents(r.name, r.components));
  }

  public addResourceComponents<Qry, Prms, ECrteDto, EUpdteDto, EDto>(
    resource: string,
    components: INgorResourceComponents<Qry, Prms, ECrteDto, EUpdteDto, EDto>): void {
    this._resourceComponents[resource] = components;
  }

  public getResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>(params: IResourceRouteParams)
    : INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto> | undefined {
    const resourceName = params.resource;
    return this._resources.find((r) => r.name === resourceName);
  }

  public getResourceComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto>(params: IResourceRouteParams):
    ComponentFactory<INgorBaseComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto>> | undefined {
    const components = this._resourceComponents[params.resource];
    if (!components) {
      return;
    }

    const id = params.id;
    if (!id) {
      return this._factoryResolver.resolveComponentFactory(components.list);
    }

    const stepComponent = components[id];
    if (stepComponent) {
      return this._factoryResolver.resolveComponentFactory(stepComponent);
    }

    const step = params.step;
    if (!step) {
      const detailComponent = components.detail;
      if (detailComponent) {
        return this._factoryResolver.resolveComponentFactory(detailComponent);
      }
      return;
    }

    const stepDetailComponent = components[step];
    if (stepDetailComponent) {
      return this._factoryResolver.resolveComponentFactory(stepDetailComponent);
    }
    return;
  }

  public getId(params: IResourceRouteParams): string | undefined {
    const components = this._resourceComponents[params.resource];
    const id = params.id;
    if (id && !components[id]) {
      return id;
    }
    return;
  }

  public getStep(params: IResourceRouteParams): string | undefined {
    const components = this._resourceComponents[params.resource];
    const id = params.id;
    if (id && components[id]) {
      return id;
    }
    return params.step;
  }
}
