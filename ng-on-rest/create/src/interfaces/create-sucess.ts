import { Router } from '@angular/router';
import { ICreateResponse } from './create-response';

export interface INgorCreateSuccess<EntityDto, ChildEntityDto> extends ICreateResponse<EntityDto, ChildEntityDto> {
  router: Router;
}
