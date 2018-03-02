export { INgorDatagridLabels } from './interfaces/datagrid-labels';
export { NgorDatagridColumnComponent } from './components/datagrid-column.component';
export { NgorDatagridComponent } from './components/datagrid.component';
export { NGOR_ENTITIES_RANGES } from './tokens/entities-ranges.token';
export { NGOR_PAGINATION_SIZE } from './tokens/pagination-size.token';

import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgorCoreModule } from 'ng-on-rest-core';
import { NgorI18nModule } from 'ng-on-rest-i18n';
import { NgorDatagridColumnComponent } from './components/datagrid-column.component';
import { NgorDatagridSearchComponent } from './components/datagrid-search.component';
import { NgorDatagridToolbarComponent } from './components/datagrid-toolbar.component';
import { NgorDatagridComponent } from './components/datagrid.component';
import en from './locales/en';
import fr from './locales/fr';
import { NGOR_ENTITIES_RANGES } from './tokens/entities-ranges.token';
import { NGOR_PAGINATION_SIZE } from './tokens/pagination-size.token';

export interface INgorListModuleConfig {
  provideEntitiesRanges?: Provider;
  providePaginationSize?: Provider;
}

@NgModule({
  declarations: [
    NgorDatagridColumnComponent,
    NgorDatagridComponent,
    NgorDatagridSearchComponent,
    NgorDatagridToolbarComponent,
  ],
  exports: [
    NgorDatagridColumnComponent,
    NgorDatagridComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbAlertModule.forRoot(),
    NgbPaginationModule.forRoot(),
    NgorI18nModule.forChild({
      defaultLocales: { en, fr },
    }),
    NgorCoreModule.forChild(),
  ],
})
export class NgorListModule {
  public static forChild() {
    return {
      ngModule: NgorListModule,
    };
  }

  public static forRoot(config: INgorListModuleConfig = {}) {
    return {
      ngModule: NgorListModule,
      providers: [
        config.provideEntitiesRanges
          ? config.provideEntitiesRanges
          : {
            provide: NGOR_ENTITIES_RANGES,
            useValue: [5, 10, 20, 50],
          },
        config.providePaginationSize
          ? config.providePaginationSize
          : {
            provide: NGOR_PAGINATION_SIZE,
            useValue: 5,
          },
      ],
    };
  }
}
