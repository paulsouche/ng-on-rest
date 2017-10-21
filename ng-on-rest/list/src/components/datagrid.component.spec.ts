// tslint:disable:max-classes-per-file
import { Component } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:no-implicit-dependencies
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// tslint:disable-next-line:no-implicit-dependencies
import * as faker from 'faker';
import {
  INgorFilterParameter,
  INgorResourceListArgs,
  INgorResourceListParams,
  NgorCoreModule,
  NgorResourceComponentsService,
  NgorResourceListFilter,
  NgorResourceListPagination,
  NgorResourceListSort,
  TNGOR_SORT,
} from 'ng-on-rest-core';
import { spyNgorGenericClient, spyNgorResourceComponentsService } from 'ng-on-rest-core/testing';
import { NGOR_ENTITIES_RANGES, NgorDatagridComponent, NgorListModule } from '../';
import { NgorDatagridSearchComponent } from './datagrid-search.component';
import { NgorDatagridToolbarComponent } from './datagrid-toolbar.component';

interface IUserQueryParams {
  start: number;
  end: number;
  filter: string;
  order: TNGOR_SORT;
  sort: 'id' | 'name' | 'birthdate';
}

interface IUserDto {
  id: number;
  name: string;
  birthdate: string;
}

const users: IUserDto[] = [
  {
    birthdate: faker.date.past().toISOString(),
    id: 1,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 2,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 3,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 4,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 5,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 6,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 7,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 8,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 9,
    name: faker.name.findName(),
  },
  {
    birthdate: faker.date.past().toISOString(),
    id: 10,
    name: faker.name.findName(),
  },
];

@Component({
  selector: 'test-ngor-datagrid',
  template: `
    <ngor-datagrid [filterParams]="filterParams">
      <ngor-datagrid-column property="id">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="name">
      </ngor-datagrid-column>
      <ngor-datagrid-column>
        <ng-template let-user>
          {{user.birthdate | date:'shortDate'}}
        </ng-template>
      </ngor-datagrid-column>
    </ngor-datagrid>
  `,
})
class TestNgorDatagridComponent {
  public filterParams: INgorFilterParameter[];
}

@Component({
  selector: 'test-ngor-datagrid',
  template: `
    <ngor-datagrid [filterParams]="filterParams">
      <ngor-datagrid-column property="id">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="name" sortable="true">
      </ngor-datagrid-column>
      <ngor-datagrid-column property="birthdate" sortable="true">
        <ng-template let-user>
          {{user.birthdate | date:'shortDate'}}
        </ng-template>
      </ngor-datagrid-column>
    </ngor-datagrid>
  `,
})
class TestSortableNgorDatagridComponent {
  public filterParams: INgorFilterParameter[];
}

describe('NgorDatagridComponent', () => {
  let resourceList: INgorResourceListArgs;
  let fixture: ComponentFixture<TestNgorDatagridComponent | TestSortableNgorDatagridComponent>;

  beforeEach(() => {
    resourceList = {
      filter: new NgorResourceListFilter(),
      pagination: new NgorResourceListPagination(),
      sort: new NgorResourceListSort(),
    };
    spyNgorResourceComponentsService.initResourceList.and.returnValue(resourceList);

    spyNgorGenericClient.queryParams.and.callFake((params: INgorResourceListParams): IUserQueryParams => {
      // This is the queryParams func
      const { filter } = params;
      const [start, end] = resourceList.pagination.getRange(params.page, params.range);
      const { order, property } = resourceList.sort;
      return {
        end,
        filter,
        order: order || 'DESC',
        sort: (property as any) || 'id',
        start,
      };
    });

    spyNgorGenericClient.query.and.callFake((queryParams: IUserQueryParams) => {
      const { start, end, sort, order, filter } = queryParams;
      const sortOrder = order === 'DESC' ? 1 : -1;
      // This is the pagination func
      resourceList.pagination.total = users.length;
      // This is what backend should do
      return Promise.resolve(users
        .filter((u) => filter ? u.name === filter : true)
        .sort((a, b) => a[sort] > b[sort] ? -sortOrder : sortOrder)
        .slice(start, end + 1));
    });
  });

  describe('When compiled in a list component', () => {
    beforeEach(async(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [
          TestNgorDatagridComponent,
        ],
        imports: [
          TranslateModule.forRoot(),
          RouterModule.forRoot([], { useHash: true }),
          NgorCoreModule.forRoot({
            resources: [],
          }),
          NgorListModule.forRoot(),
        ],
        providers: [
          { provide: NgorResourceComponentsService, useValue: spyNgorResourceComponentsService },
        ],
      })
        .createComponent(TestNgorDatagridComponent);

      fixture.autoDetectChanges();
    }));

    it('Should fetch entities', inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
      const [range] = ranges;
      const entitiesRows = fixture.debugElement.queryAll(By.css('.table tbody tr'));
      expect(entitiesRows.length).toBe(range);
    }));

    it('Should hide search bar', () => {
      const toolbar: NgorDatagridToolbarComponent = fixture.debugElement
        .query(By.directive(NgorDatagridToolbarComponent)).componentInstance;
      expect(toolbar.hideSearch).toBeTruthy();
    });

    it('Should hide add && detail links', inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
      const [range] = ranges;
      const toolbar: NgorDatagridToolbarComponent = fixture.debugElement
        .query(By.directive(NgorDatagridToolbarComponent)).componentInstance;
      expect(toolbar.hideAdd).toBeTruthy();
      const detailCells = fixture.debugElement.queryAll(By.css('.table tr > :last-child'));
      expect(detailCells.length).toBe(range + 1);
      detailCells.forEach((cell) => expect(cell.attributes.hidden).toBeTruthy());
    }));

    describe('And user change range', () => {
      beforeEach(async(inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
        const [, newRange] = ranges;
        const toolbar: NgorDatagridToolbarComponent = fixture.debugElement
          .query(By.directive(NgorDatagridToolbarComponent)).componentInstance;
        toolbar.range = newRange;
        toolbar.rangeChange();
        fixture.autoDetectChanges();
      })));

      it('Should fetch entities', inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
        fixture.detectChanges();
        const [, newRange] = ranges;
        const entitiesRows = fixture.debugElement.queryAll(By.css('.table tbody tr'));
        expect(entitiesRows.length).toBe(newRange);
      }));
    });

    describe('And user change page', () => {
      beforeEach(async(() => {
        const toolbar: NgorDatagridToolbarComponent = fixture.debugElement
          .query(By.directive(NgorDatagridToolbarComponent)).componentInstance;
        toolbar.pageChange(2);
        fixture.autoDetectChanges();
      }));

      it('Should fetch entities', inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
        fixture.detectChanges();
        const [range] = ranges;
        const entitiesRows = fixture.debugElement.queryAll(By.css('.table tbody tr'));
        expect(entitiesRows.length).toBe(range);
        const datagrid: NgorDatagridComponent<any, any, any, any, any> = fixture.debugElement
          .query(By.directive(NgorDatagridComponent)).componentInstance;
        expect(datagrid.entities).toEqual(users
          .sort((a, b) => a.id > b.id ? -1 : 1)
          .slice(range, range * 2 + 1));
      }));
    });

    describe('And user provides filter params', () => {
      beforeEach(async(() => {
        fixture.componentInstance.filterParams = [{ key: 'name' }];
        fixture.autoDetectChanges();
      }));

      it('Should display search bar', () => {
        fixture.detectChanges();
        const toolbar: NgorDatagridToolbarComponent = fixture.debugElement
          .query(By.directive(NgorDatagridToolbarComponent)).componentInstance;
        expect(toolbar.hideSearch).toBeFalsy();
      });

      describe('And user search an entity', () => {
        beforeEach(async(() => {
          const searchbar: NgorDatagridSearchComponent = fixture.debugElement
            .query(By.directive(NgorDatagridSearchComponent)).componentInstance;
          const [user] = users;
          searchbar.searchFormGroup.controls.search.setValue(user.name);
          searchbar.doSearch();
          fixture.autoDetectChanges();
        }));

        it('Should fetch entities', () => {
          fixture.detectChanges();
          const entitiesRows = fixture.debugElement.queryAll(By.css('.table tbody tr'));
          expect(entitiesRows.length).toBe(1);
        });
      });

      describe('And user search an entity that does not exist', () => {
        beforeEach(async(() => {
          const searchbar: NgorDatagridSearchComponent = fixture.debugElement
            .query(By.directive(NgorDatagridSearchComponent)).componentInstance;
          searchbar.searchFormGroup.controls.search.setValue('404');
          searchbar.doSearch();
          fixture.autoDetectChanges();
        }));

        it('Should fetch entities', () => {
          fixture.detectChanges();
          const datagrid: NgorDatagridComponent<any, any, any, any, any> = fixture.debugElement
            .query(By.directive(NgorDatagridComponent)).componentInstance;
          expect(datagrid.noEntities).toBeTruthy();
        });
      });
    });
  });

  describe('When compiled in a sortable list component', () => {
    beforeEach(async(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [
          TestSortableNgorDatagridComponent,
        ],
        imports: [
          TranslateModule.forRoot(),
          RouterModule.forRoot([], { useHash: true }),
          NgorCoreModule.forRoot({
            resources: [],
          }),
          NgorListModule.forRoot(),
        ],
        providers: [
          { provide: NgorResourceComponentsService, useValue: spyNgorResourceComponentsService },
        ],
      })
        .createComponent(TestSortableNgorDatagridComponent);

      fixture.autoDetectChanges();
    }));

    it('Should fetch entities', inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
      const [range] = ranges;
      const datagrid: NgorDatagridComponent<any, any, any, any, any> = fixture.debugElement
        .query(By.directive(NgorDatagridComponent)).componentInstance;
      expect(datagrid.entities).toEqual(users
        .sort((a, b) => a.name > b.name ? -1 : 1)
        .slice(0, range));
    }));

    describe('And user toggle sort', () => {
      beforeEach(async(() => {
        fixture.debugElement.query(By.css('.table tr th + th'))
          .triggerEventHandler('click', new Event('click'));
        fixture.autoDetectChanges();
      }));

      it('Should fetch entities', inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
        fixture.detectChanges();
        const [range] = ranges;
        const datagrid: NgorDatagridComponent<any, any, any, any, any> = fixture.debugElement
          .query(By.directive(NgorDatagridComponent)).componentInstance;
        expect(datagrid.entities).toEqual(users
          .sort((a, b) => a.name > b.name ? 1 : -1)
          .slice(0, range));
      }));
    });

    describe('And user change sort', () => {
      beforeEach(async(() => {
        fixture.debugElement.query(By.css('.table tr th + th + th'))
          .triggerEventHandler('click', new Event('click'));
        fixture.autoDetectChanges();
      }));

      it('Should fetch entities', inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
        fixture.detectChanges();
        const [range] = ranges;
        const datagrid: NgorDatagridComponent<any, any, any, any, any> = fixture.debugElement
          .query(By.directive(NgorDatagridComponent)).componentInstance;
        expect(datagrid.entities).toEqual(users
          .sort((a, b) => a.birthdate > b.birthdate ? -1 : 1)
          .slice(0, range));
      }));
    });
  });

  describe('When resource has create component', () => {
    beforeEach(() => {
      Object.defineProperty(spyNgorResourceComponentsService, 'hasCreateComponent', {
        configurable: false,
        enumerable: true,
        get: () => true,
      });
    });

    beforeEach(async(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [
          TestNgorDatagridComponent,
        ],
        imports: [
          TranslateModule.forRoot(),
          RouterModule.forRoot([], { useHash: true }),
          NgorCoreModule.forRoot({
            resources: [],
          }),
          NgorListModule.forRoot(),
        ],
        providers: [
          { provide: NgorResourceComponentsService, useValue: spyNgorResourceComponentsService },
        ],
      })
        .createComponent(TestNgorDatagridComponent);

      fixture.autoDetectChanges();
    }));

    it('Should display add link', () => {
      const toolbar: NgorDatagridToolbarComponent = fixture.debugElement
        .query(By.directive(NgorDatagridToolbarComponent)).componentInstance;
      expect(toolbar.hideAdd).toBeFalsy();
    });
  });

  describe('When resource has detail component', () => {
    beforeEach(() => {
      Object.defineProperty(spyNgorResourceComponentsService, 'hasDetailComponent', {
        configurable: false,
        enumerable: true,
        get: () => true,
      });
    });

    beforeEach(async(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [
          TestNgorDatagridComponent,
        ],
        imports: [
          TranslateModule.forRoot(),
          RouterModule.forRoot([], { useHash: true }),
          NgorCoreModule.forRoot({
            resources: [],
          }),
          NgorListModule.forRoot(),
        ],
        providers: [
          { provide: NgorResourceComponentsService, useValue: spyNgorResourceComponentsService },
        ],
      })
        .createComponent(TestNgorDatagridComponent);

      fixture.autoDetectChanges();
    }));

    it('Should display detail links', inject([NGOR_ENTITIES_RANGES], (ranges: number[]) => {
      const [range] = ranges;
      const detailCells = fixture.debugElement.queryAll(By.css('.table tr > :last-child'));
      expect(detailCells.length).toBe(range + 1);
      detailCells.forEach((cell) => expect(cell.attributes.hidden).toBeFalsy());
    }));
  });
});
