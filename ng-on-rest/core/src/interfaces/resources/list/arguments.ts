import { INgorResourceListFilter } from './filter';
import { INgorResourceListPagination } from './pagination';
import { INgorResourceListSort } from './sort';

export interface INgorResourceListArgs {
  filter: INgorResourceListFilter;
  pagination: INgorResourceListPagination;
  sort: INgorResourceListSort;
}
