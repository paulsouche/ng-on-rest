import { HttpResponse } from '@angular/common/http';
import { INgorResourceListPagination } from './pagination';

export type TNgorPaginationFunc = (res: HttpResponse<any>) => void;

export type TNgorPaginationFuncCurry = (pagination: INgorResourceListPagination) => TNgorPaginationFunc;
