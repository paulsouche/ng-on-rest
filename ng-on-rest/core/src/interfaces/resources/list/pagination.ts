export interface INgorResourceListPagination {
  pages: number;
  start?: number;
  end?: number;
  total?: number;
  currentNumberOfItems?: number;
  getRange(page: number, numberOfItems: number): [number, number];
  clear(): void;
}
