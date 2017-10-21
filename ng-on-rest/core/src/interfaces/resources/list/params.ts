import { INgorFilterParameter } from './filter';

export interface INgorResourceListParams {
  page: number;
  range: number;
  filter: string;
  filterParams: INgorFilterParameter[];
}
