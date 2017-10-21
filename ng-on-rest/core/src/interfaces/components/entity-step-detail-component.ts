import { INgorEntityDetailComponent } from './entity-detail-component';
import { INgorStepComponent } from './step-component';

export interface INgorEntityStepDetailComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>
  extends INgorStepComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>,
  INgorEntityDetailComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> {
}
