import { INgorBaseComponent } from './base-component';

export interface INgorStepComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>
  extends INgorBaseComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> {
  step: string;
}
