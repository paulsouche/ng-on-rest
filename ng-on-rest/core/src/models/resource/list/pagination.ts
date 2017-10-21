import { INgorResourceListPagination } from '../../../interfaces/resources/list/pagination';

export class NgorResourceListPagination implements INgorResourceListPagination {
  public start?: number | undefined;
  public end?: number | undefined;
  public total?: number | undefined;
  public currentNumberOfItems?: number | undefined;

  get pages() {
    const total = this.total || 0;
    const numberOfItems = this._numberOfItems();
    return numberOfItems
      ? total / numberOfItems
      : 0;
  }

  public getRange(page: number, numberOfItems: number) {
    this.currentNumberOfItems = numberOfItems;
    const interval = Math.min(numberOfItems, (this.total || Number.POSITIVE_INFINITY) - (page - 1) * numberOfItems);
    const start = (page - 1) * Math.max(interval, numberOfItems);
    return [start, start + interval - 1] as [number, number];
  }

  public clear() {
    this.start = undefined;
    this.end = undefined;
    this.total = undefined;
    this.currentNumberOfItems = undefined;
  }

  private _numberOfItems() {
    const currentNumberOfItems = this.currentNumberOfItems;

    if (currentNumberOfItems) {
      return currentNumberOfItems;
    }

    const start = this.start || 0;
    const end = this.end || -1;

    return end - start + 1;
  }
}
