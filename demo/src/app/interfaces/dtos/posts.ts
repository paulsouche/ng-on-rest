export interface IPostQueryParams {
  _start?: number;
  _end?: number;
  _sort?: string;
  _order?: string;
  q?: string;
  userId?: number;
}

export interface IPostParams {
  id: number;
}

export interface IPostCreateDto {
  userId: number;
  title: string;
  body?: string;
}

export interface IPostUpdateDto extends IPostParams {
  userId: number;
  title?: string;
  body?: string;
}

export interface IPostDto extends IPostUpdateDto {
  title: string;
  body: string;
}
