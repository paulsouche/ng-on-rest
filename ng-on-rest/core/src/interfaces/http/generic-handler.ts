import { ResourceHandler } from '@ngx-resource/core';
import { TNgorPaginationFunc } from '../resources/list/pagination-func';

export interface INgorGenericHandler extends ResourceHandler {
  setUpdatePaginationFunc?(func?: TNgorPaginationFunc): void;
}
