import {
  INgorEntityDetailComponent,
  INgorEntityStepDetailComponent,
  INgorListComponent,
  INgorResource,
  INgorStepComponent,
} from 'ng-on-rest-core';
import { IGenericClient } from '../client';
import { IPostCreateDto, IPostDto, IPostParams, IPostQueryParams, IPostUpdateDto } from '../dtos/posts';

export type PostResource =
  INgorResource<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
export type PostClient =
  IGenericClient<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
export type PostListComponent =
  INgorListComponent<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
export type PostCreateComponent =
  INgorStepComponent<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
export type PostDetailComponent =
  INgorEntityDetailComponent<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
export type PostDeleteComponent =
  INgorEntityStepDetailComponent<IPostQueryParams, IPostParams, IPostCreateDto, IPostUpdateDto, IPostDto>;
