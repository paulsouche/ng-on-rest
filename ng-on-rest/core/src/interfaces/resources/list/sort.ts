export type TNGOR_SORT = 'ASC' | 'DESC';

export interface INgorResourceListSort {
  order: TNGOR_SORT;
  property: string;
  toggle(): void;
  setSortProperty(property: string): void;
}
