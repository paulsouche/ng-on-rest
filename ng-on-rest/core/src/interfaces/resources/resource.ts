import { INgorResourceComponents } from '../components/resource-components';
import { INgorResourceMappers } from './resource-mappers';

export interface INgorResource<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> {
  name: string;
  endPoint: string;
  components: INgorResourceComponents<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>;
  mappers?: INgorResourceMappers<EntityCreateDto, EntityUpdateDto, EntityDto>;
}
