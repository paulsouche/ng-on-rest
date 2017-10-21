import { INgorEntityDetailCell } from './entity-detail-cell';

export interface INgorEntityDetailColumn<EntityDto> {
  class: string;
  cells: Array<INgorEntityDetailCell<EntityDto>>;
}
