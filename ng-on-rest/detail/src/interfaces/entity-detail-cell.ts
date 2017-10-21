export interface INgorEntityDetailCell<EntityDto> {
  property: string;
  label: string;
  class: string;
  filter?: (entity: EntityDto) => string | undefined | null;
}
