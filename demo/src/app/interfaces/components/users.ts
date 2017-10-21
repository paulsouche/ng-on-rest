import {
  INgorEntityDetailComponent,
  INgorEntityStepDetailComponent,
  INgorListComponent,
  INgorResource,
  INgorStepComponent,
} from 'ng-on-rest-core';
import { IGenericClient } from '../client';
import { IUserCreateDto, IUserDto, IUserParams, IUserQueryParams, IUserUpdateDto } from '../dtos/users';

export type UserResource =
  INgorResource<IUserQueryParams, IUserParams, IUserCreateDto, IUserUpdateDto, IUserDto>;

export type UserClient =
  IGenericClient<IUserQueryParams, IUserParams, IUserCreateDto, IUserUpdateDto, IUserDto>;

export type UserListComponent =
  INgorListComponent<IUserQueryParams, IUserParams, IUserCreateDto, IUserUpdateDto, IUserDto>;

export type UserCreateComponent =
  INgorStepComponent<IUserQueryParams, IUserParams, IUserCreateDto, IUserUpdateDto, IUserDto>;

export type UserDetailComponent =
  INgorEntityDetailComponent<IUserQueryParams, IUserParams, IUserCreateDto, IUserUpdateDto, IUserDto>;

export type UserDeleteComponent =
  INgorEntityStepDetailComponent<IUserQueryParams, IUserParams, IUserCreateDto, IUserUpdateDto, IUserDto>;
