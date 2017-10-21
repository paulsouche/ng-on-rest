export interface INgorResourceMappers<EntityCreateDto, EntityUpdateDto, EntityDto> {
  dtoToCreateFormModel?: <FormModel>(dto: EntityDto) => Promise<FormModel>;
  dtoToUpdateFormModel?: <FormModel>(dto: EntityDto) => Promise<FormModel>;
  formModelToCreateDto?: <FormModel>(model: FormModel) => Promise<EntityCreateDto>;
  formModelToUpdateDto?: <FormModel>(dto: EntityDto, model: FormModel) => Promise<EntityUpdateDto>;
}
