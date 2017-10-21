import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INgorDatagridLabels } from '../interfaces/datagrid-labels';

@Component({
  selector: 'ngor-datagrid-search',
  template: `
    <form [formGroup]="searchFormGroup" (submit)="doSearch()">
      <div class="input-group">
        <input type="text" class="form-control"
               formControlName="search" autofocus
               [placeholder]="labels.searchPlaceholder | translate">
        <span class="input-group-btn">
          <button class="btn btn-secondary"
                  type="submit"
                  [innerHTML]="labels.searchButton | translate">
          </button>
        </span>
      </div>
    </form>
  `,
})
export class NgorDatagridSearchComponent implements OnInit {
  @Input()
  public labels: INgorDatagridLabels;

  @Output()
  public onSearch = new EventEmitter<string>(true);

  public searchFormGroup: FormGroup;

  private _formbuilder: FormBuilder;

  constructor(formbuilder: FormBuilder) {
    this._formbuilder = formbuilder;
  }

  public ngOnInit() {
    this.searchFormGroup = this._formbuilder.group({
      search: [''],
    });
  }

  public doSearch() {
    this.onSearch.emit(this.searchFormGroup.controls.search.value);
  }
}
