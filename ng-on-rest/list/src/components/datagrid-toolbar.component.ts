import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { INgorDatagridLabels } from '../interfaces/datagrid-labels';
import { NGOR_ENTITIES_RANGES } from '../tokens/entities-ranges.token';
import { NGOR_PAGINATION_SIZE } from '../tokens/pagination-size.token';

@Component({
  selector: 'ngor-datagrid-toolbar',
  template: `
    <header>
      <div class="row justify-content-between">
        <div class="col-7">
          <ngor-datagrid-search [attr.hidden]="hideSearch || null"
                                [labels]="labels"
                                (onSearch)="search($event)">
          </ngor-datagrid-search>
        </div>
        <div class="col-5 text-right" [attr.hidden]="hideAdd || null">
          <a class="btn btn-primary"
             routerLink="create"
             [innerHTML]="labels.addButton | translate">
          </a>
        </div>
      </div>
      <div class="row mt-4" [attr.hidden]="hidePagination || null">
        <div class="col text-right" [innerHTML]="labels.range | translate"></div>
      </div>
      <div class="row mt-2" [attr.hidden]="hidePagination || null">
        <div class="col-8 ml-auto d-flex justify-content-center">
          <ngb-pagination [collectionSize]="collectionSize"
                          [maxSize]="paginationSize"
                          rotate="true"
                          (pageChange)="pageChange($event)">
          </ngb-pagination>
        </div>
        <div class="col-2">
          <select class="form-control" [(ngModel)]="range" (change)="rangeChange()">
            <option *ngFor="let entitiesRange of entitiesRanges" [ngValue]="entitiesRange">
              {{entitiesRange}}
            </option>
          </select>
        </div>
      </div>
    </header>
  `,
})
export class NgorDatagridToolbarComponent {
  @Input()
  public hideAdd: boolean;

  @Input()
  public hidePagination: boolean;

  @Input()
  public hideSearch: boolean;

  @Input()
  public labels: INgorDatagridLabels;

  @Input()
  public pages: number;

  @Input()
  public range: number;

  @Output()
  public onPageChange = new EventEmitter<number>(true);

  @Output()
  public onRangeChange = new EventEmitter<number>(true);

  @Output()
  public onSearch = new EventEmitter<string>();

  public paginationSize: number;
  public entitiesRanges: number[];

  constructor(
    @Inject(NGOR_ENTITIES_RANGES) entitiesRanges: number[],
    @Inject(NGOR_PAGINATION_SIZE) paginationSize: number) {
    this.entitiesRanges = entitiesRanges;
    this.paginationSize = paginationSize;
  }

  get collectionSize() {
    return this.pages * 10;
  }

  public pageChange(page: number) {
    this.onPageChange.emit(page);
  }

  public rangeChange() {
    this.onRangeChange.emit(this.range);
  }

  public search(value: string) {
    this.onSearch.emit(value);
  }
}
