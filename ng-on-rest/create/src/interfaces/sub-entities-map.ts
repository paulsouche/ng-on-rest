export interface INgorSubEntitiesMap<ParentEntity, ChildEntity> {
  property: string;
  resourceName: string;
  bind: (parentEntity: ParentEntity, childEntity: ChildEntity) => ChildEntity;
}
