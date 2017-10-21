import { INgorBaseComponent } from './base-component';

export interface INgorEntityDetailComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>
  extends INgorBaseComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> {
  entity: EntityDto;
}
