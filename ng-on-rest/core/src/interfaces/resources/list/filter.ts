export interface INgorFilterParameter {
  key: string;
  map?(filterValue: string): string;
}

export interface INgorQueryFilter {
  [key: string]: string | INgorQueryFilter;
}

export interface INgorResourceListFilter {
  getFilter(filterParams?: INgorFilterParameter[], search?: string): INgorQueryFilter[];
}
