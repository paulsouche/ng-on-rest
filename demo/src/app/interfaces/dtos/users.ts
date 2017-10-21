export interface IUserQueryParams {
  _start?: number;
  _end?: number;
  _sort?: string;
  _order?: string;
  q?: string;
}

export interface IUserParams {
  id: number;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUserCreateDto {
  name: string;
  username: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: IAddress;
  company?: ICompany;
}

export interface IUserUpdateDto extends IUserParams, IUserCreateDto { }

export interface IUserDto extends IUserUpdateDto {
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}
