import { INgorFilterParameter } from '../resources/list/filter';
import { INgorBaseComponent } from './base-component';

export interface INgorListComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>
  extends INgorBaseComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> {
  filterParams?: INgorFilterParameter[] | undefined;
}
