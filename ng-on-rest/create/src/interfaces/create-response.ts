export interface ICreateResponse<EntityDto, ChildEntityDto> {
  createdEntity: EntityDto;
  createdChildEntities?: {
    [key: string]: ChildEntityDto | ChildEntityDto[];
  } | undefined;
}
