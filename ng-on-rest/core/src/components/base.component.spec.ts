// tslint:disable:max-classes-per-file
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:no-implicit-dependencies
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {
  INgorEntityDetailComponent,
  INgorEntityStepDetailComponent,
  INgorGenericClient,
  INgorListComponent,
  INgorResource,
  INgorStepComponent,
  IResourceRouteParams,
  NgorBaseComponent,
  NgorCoreModule,
  NgorResourceComponentsService,
} from '..';

@Component({
  selector: 'mock-list-component',
  template: 'Here is the list',
})
class MockListComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto>
  implements INgorListComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
  public resource: INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  public client: INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
}

@Component({
  selector: 'mock-create-component',
  template: 'Here is the create',
})
class MockCreateComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto>
  implements INgorStepComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
  public resource: INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  public client: INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  public step: string;
}

@Component({
  selector: 'mock-detail-component',
  template: 'Here is the detail',
})
class MockDetailComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto>
  implements INgorEntityDetailComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
  public resource: INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  public client: INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  public entity: EDto;
}

@Component({
  selector: 'mock-delete-component',
  template: 'Here is the delete',
})
class MockDeleteComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto>
  implements INgorEntityStepDetailComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
  public resource: INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  public client: INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  public entity: EDto;
  public step: string;
}

@Component({
  selector: 'mock-child-component',
  template: 'Here is the content',
})
class MockChildComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
  constructor(public resourceComponentsService
    : NgorResourceComponentsService<Qry, Prms, ECrteDto, EUpdteDto, EDto>) { }
}

@Component({
  selector: 'mock-parent-component',
  template: '<mock-child-component></mock-child-component>',
})
class MockParentComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto>
  implements INgorListComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
  public resource: INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  public client: INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
}

const routeParamsSubject = new Subject<IResourceRouteParams>();
const spyActivatedRoute = {
  params: routeParamsSubject,
};
const spyLocation = jasmine.createSpyObj<Location>('spyLocation', ['back']);

describe('NgorBaseComponent', () => {
  let fixture: ComponentFixture<NgorBaseComponent<any, any, any, any, any>>;
  let httpBackend: HttpTestingController;

  beforeEach(async(() => {
    spyLocation.back.calls.reset();

    fixture = TestBed
      .configureTestingModule({
        declarations: [
          MockListComponent,
          MockCreateComponent,
          MockDetailComponent,
          MockDeleteComponent,
          MockChildComponent,
          MockParentComponent,
        ],
        imports: [
          HttpClientTestingModule,
          NgorCoreModule.forRoot({
            resources: [{
              components: {
                create: MockCreateComponent,
                delete: MockDeleteComponent,
                detail: MockDetailComponent,
                list: MockListComponent,
                nested: MockParentComponent,
              },
              endPoint: 'endpoint',
              name: 'entities',
            }],
          }),
        ],
        providers: [
          {
            multi: true,
            provide: ANALYZE_FOR_ENTRY_COMPONENTS,
            useValue: [
              MockListComponent,
              MockCreateComponent,
              MockDetailComponent,
              MockDeleteComponent,
              MockParentComponent,
            ],
          },
        ],
      })
      .overrideComponent(NgorBaseComponent, {
        set: {
          providers: [
            NgorResourceComponentsService,
            { provide: ActivatedRoute, useValue: spyActivatedRoute },
            { provide: Location, useValue: spyLocation },
          ],
        },
      })
      .createComponent(NgorBaseComponent);

    httpBackend = TestBed.get(HttpTestingController);

    fixture.autoDetectChanges();
  }));

  afterEach(() => fixture.destroy());

  describe('As a list entities component', () => {
    beforeEach(async(() => {
      routeParamsSubject.next({
        resource: 'entities',
      });
      fixture.detectChanges();
    }));

    it('Should create the provided list Component', () => {
      expect(fixture.debugElement.query(By.directive(MockListComponent))).not.toBeNull();
    });
  });

  describe('As a create entity component', () => {
    beforeEach(async(() => {
      routeParamsSubject.next({
        id: 'create',
        resource: 'entities',
      });
      fixture.detectChanges();
    }));

    it('Should create the provided create Component', () => {
      const createComponent = fixture
        .debugElement.query(By.directive(MockCreateComponent));
      const createInstance: MockCreateComponent<any, any, any, any, any> = createComponent.componentInstance;
      expect(createInstance.step).toBe('create');
    });
  });

  describe('As an entity detail component', () => {
    beforeEach(async(() => {
      routeParamsSubject.next({
        id: 'id',
        resource: 'entities',
      });
      fixture.autoDetectChanges();
    }));

    beforeEach(async(() => {
      const entityRequest = httpBackend.expectOne('endpoint/entities/id');
      entityRequest.flush({ id: 'id' });
      httpBackend.verify();
    }));

    it('Should create the provided entity detail Component', () => {
      const detailComponent = fixture
        .debugElement.query(By.directive(MockDetailComponent));
      const detailInstance: MockDetailComponent<any, any, any, any, any> = detailComponent.componentInstance;
      expect(detailInstance.entity).toEqual({ id: 'id' });
    });
  });

  describe('As an entity delete component', () => {
    beforeEach(async(() => {
      routeParamsSubject.next({
        id: 'id',
        resource: 'entities',
        step: 'delete',
      });
      fixture.autoDetectChanges();
    }));

    beforeEach(async(() => {
      const entityRequest = httpBackend.expectOne('endpoint/entities/id');
      entityRequest.flush({ id: 'id' });
      httpBackend.verify();
    }));

    it('Should create the provided entity delete Component', () => {
      const deleteComponent = fixture
        .debugElement.query(By.directive(MockDeleteComponent));
      const deleteInstance: MockDeleteComponent<any, any, any, any, any> = deleteComponent.componentInstance;
      expect(deleteInstance.entity).toEqual({ id: 'id' });
      expect(deleteInstance.step).toBe('delete');
    });
  });

  describe('As a nested component', () => {
    beforeEach(async(() => {
      routeParamsSubject.next({
        id: 'nested',
        resource: 'entities',
      });
      fixture.detectChanges();
    }));

    it('Should provide the resourceComponentsService for each Component', () => {
      const parentComponent: MockParentComponent<any, any, any, any, any> = fixture
        .debugElement.query(By.directive(MockParentComponent)).componentInstance;
      const childComponent: MockChildComponent<any, any, any, any, any> = fixture
        .debugElement.query(By.directive(MockChildComponent)).componentInstance;
      expect(parentComponent.client).toBe(childComponent.resourceComponentsService.client);
      expect(parentComponent.resource).toBe(childComponent.resourceComponentsService.resource);
    });
  });

  describe('When resource does not exist', () => {
    beforeEach(async(() => {
      routeParamsSubject.next({
        resource: 'unknown-entities',
      });
      fixture.detectChanges();
    }));

    it('Should catch the error and get back in browsing history', () => {
      expect(spyLocation.back).toHaveBeenCalled();
    });
  });

  describe('When entity does not exist', () => {
    beforeEach(async(() => {
      routeParamsSubject.next({
        id: '404',
        resource: 'entities',
      });
      fixture.autoDetectChanges();
    }));

    beforeEach(async(() => {
      const entityRequest = httpBackend.expectOne('endpoint/entities/404');
      entityRequest.error(new ErrorEvent('404'));
      httpBackend.verify();
    }));

    it('Should catch the error and get back in browsing history', () => {
      expect(spyLocation.back).toHaveBeenCalled();
    });
  });

  describe('When step does not exist', () => {
    beforeEach(async(() => {
      routeParamsSubject.next({
        id: 'id',
        resource: 'entities',
        step: 'unknownStep',
      });
      fixture.detectChanges();
    }));

    it('Should catch the error and get back in browsing history', () => {
      expect(spyLocation.back).toHaveBeenCalled();
    });
  });
});
