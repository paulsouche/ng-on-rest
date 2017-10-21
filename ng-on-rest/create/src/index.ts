export { INgorCreateLabels } from './interfaces/create-labels';
export { INgorCreateStepLabels } from './interfaces/create-step-labels';
export { INgorCreateSuccess } from './interfaces/create-sucess';
export { INgorStepEnterParams } from './interfaces/step-enter-params';
export { INgorSubEntitiesMap } from './interfaces/sub-entities-map';

export { NgorCreateEntityStepComponent } from './components/create-entity-step.component';
export { NgorCreateEntityComponent } from './components/create-entity.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgorCoreModule } from 'ng-on-rest-core';
import { NgorFormsModule } from 'ng-on-rest-forms';
import { NgorCreateEntityStepComponent } from './components/create-entity-step.component';
import { NgorCreateEntityComponent } from './components/create-entity.component';

@NgModule({
  declarations: [
    NgorCreateEntityStepComponent,
    NgorCreateEntityComponent,
  ],
  exports: [
    NgorCreateEntityStepComponent,
    NgorCreateEntityComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    NgorCoreModule.forChild(),
    NgorFormsModule.forChild(),
  ],
})
export class NgorCreateModule {
  public static forChild() {
    return {
      ngModule: NgorCreateModule,
    };
  }

  public static forRoot() {
    return {
      ngModule: NgorCreateModule,
    };
  }
}
