import { Component, Input } from '@angular/core';
import { INgorEntityDetailColumn } from '../interfaces/entity-detail-column';

@Component({
  selector: 'ngor-update-entity-detail',
  template: `
    <div class="row">
      <div class="col-lg-3 col-md-4 col-12">
        <div class="row">
          <div class="col text-center">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-md-8 col-12">
        <div class="row">
          <ng-container *ngFor="let column of columns">
            <div [ngClass]="column.class">
              <div class="row flex-column">
                <ng-container *ngFor="let cell of column.cells">
                  <div [ngClass]="cell.class">
                    <label>{{cell.label | translate}}</label>
                    <div [innerHTML]="(cell.filter
                      ? cell.filter(entity)
                      : entity | ngorProperty:cell.property)
                      || '&nbsp;'">
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export class NgorUpdateEntityDetailComponent<EntityDto> {
  @Input()
  public entity: EntityDto;

  @Input()
  public columns: Array<INgorEntityDetailColumn<EntityDto>>;
}
