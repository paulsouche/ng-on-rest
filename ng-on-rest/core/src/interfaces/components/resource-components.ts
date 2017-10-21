import { Type } from '@angular/core';
import { INgorBaseComponent } from './base-component';
import { INgorEntityDetailComponent } from './entity-detail-component';
import { INgorListComponent } from './list-component';
import { INgorStepComponent } from './step-component';

export interface INgorResourceComponents<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> {
  create?: Type<INgorStepComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>> | undefined;
  detail?: Type<INgorEntityDetailComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>> | undefined;
  list: Type<INgorListComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>>;
  [ stepDetail: string
  ]: Type<INgorBaseComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>> | undefined;
}
