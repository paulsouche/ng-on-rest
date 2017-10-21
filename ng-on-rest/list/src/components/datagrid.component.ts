import { AfterContentInit, Component, ContentChildren, Inject, Input } from '@angular/core';
import {
  INgorFilterParameter,
  INgorResourceListArgs,
  INgorResourceListFilter,
  INgorResourceListPagination,
  INgorResourceListSort,
  NgorResourceComponentsService,
} from 'ng-on-rest-core';
import { INgorDatagridLabels } from '../interfaces/datagrid-labels';
import { NGOR_ENTITIES_RANGES } from '../tokens/entities-ranges.token';
import { NgorDatagridColumnComponent } from './datagrid-column.component';

@Component({
  selector: 'ngor-datagrid',
  template: `
    <ngor-datagrid-toolbar [hideAdd]="!displayAddLink"
                           [hidePagination]="noEntities"
                           [hideSearch]="!filterParams"
                           [labels]="labels"
                           [pages]="pages"
                           [range]="range"
                           (onPageChange)="goToPage($event)"
                           (onRangeChange)="goToRange($event)"
                           (onSearch)="goToSearch($event)">
    </ngor-datagrid-toolbar>
    <div class="row mt-4" [attr.hidden]="!noEntities || null">
      <div class="col-6 m-auto">
        <ngb-alert type="info" [dismissible]="false">
          <span [innerHTML]="labels.noEntities | translate"></span>
        </ngb-alert>
      </div>
    </div>
    <table class="table mt-5" [attr.hidden]="noEntities || loading || null">
      <thead>
        <tr>
          <th *ngFor="let column of columns" (click)="goToSort(column)">
            {{(column.title || column.property) | translate}}
          </th>
          <th [attr.hidden]="!displayDetailLink || null">
            &nbsp;
          </th>
        </tr>
      </thead>
      <tfoot></tfoot>
      <tbody>
        <tr *ngFor="let entity of entities">
          <td *ngFor="let column of columns">
            <ng-container *ngIf="column.template">
              <ng-container *ngTemplateOutlet="column.template; context: { $implicit: entity }"></ng-container>
            </ng-container>
            <ng-container *ngIf="!column.template">
              {{entity | ngorProperty:column.property}}
            </ng-container>
          </td>
          <td [attr.hidden]="!displayDetailLink || null">
            <a class="btn btn-primary"
               [routerLink]="entity.id"
               [innerHTML]="labels.editButton | translate">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class NgorDatagridComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto extends { id: any }>
  implements AfterContentInit, INgorResourceListArgs {

  @ContentChildren(NgorDatagridColumnComponent)
  public columns: NgorDatagridColumnComponent[];

  @Input()
  public filterParams: INgorFilterParameter[] | undefined;

  // TODO i18n module
  @Input()
  public labels: INgorDatagridLabels = {
    addButton: 'Add',
    editButton: 'Edit',
    noEntities: 'No results :(',
    range: 'Number of items',
    searchButton: 'Go!',
    searchPlaceholder: 'Search',
  };

  public entities: EDto[] | undefined;
  public range: number;
  public pagination: INgorResourceListPagination;
  public filter: INgorResourceListFilter;
  public sort: INgorResourceListSort;

  private _resourceService: NgorResourceComponentsService<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  private _search: string;
  private _page: number;

  constructor(
    resourceService: NgorResourceComponentsService<Qry, Prms, ECrteDto, EUpdteDto, EDto>,
    @Inject(NGOR_ENTITIES_RANGES) entitiesRanges: number[]) {
    this.range = entitiesRanges[0];
    this._resourceService = resourceService;
  }

  get displayAddLink() {
    return this._resourceService.hasCreateComponent;
  }

  get displayDetailLink() {
    return this._resourceService.hasDetailComponent;
  }

  get pages() {
    return this.pagination.pages;
  }

  get noEntities() {
    return this.entities && this.entities.length === 0;
  }

  get loading() {
    return !this.entities;
  }

  public ngOnInit() {
    const { filter, pagination, sort } = this._resourceService.initResourceList();
    this.filter = filter;
    this.pagination = pagination;
    this.sort = sort;
  }

  public ngAfterContentInit() {
    const firstColumn = this.columns.find((c) => c.sortable);
    if (firstColumn) {
      this.sort.setSortProperty(firstColumn.property);
    }
  }

  public goToPage(page: number) {
    this._page = page;
    this.entities = undefined;

    const client = this._resourceService.client;

    const queryParams: Qry = client.queryParams
      ? client.queryParams({
        filter: this._search,
        filterParams: this.filterParams || [],
        page,
        range: this.range,
      })
      // tslint:disable-next-line:no-object-literal-type-assertion
      : {} as Qry;

    client.query(queryParams)
      .then((entities) => this.entities = entities);
  }

  public goToRange(range: number) {
    this.range = range;
    this.pagination.clear();
    this.goToPage(1);
  }

  public goToSort(column: NgorDatagridColumnComponent) {
    if (column.sortable) {
      const sort = this.sort;
      if (column.property === sort.property) {
        sort.toggle();
      } else {
        sort.setSortProperty(column.property);
      }
      this.goToPage(this._page);
    }
  }

  public goToSearch(search: string) {
    this._search = search;
    this.pagination.clear();
    this.goToPage(1);
  }
}
