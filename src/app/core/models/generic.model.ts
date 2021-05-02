export interface PaginatedRequestModel {
  page: number;
  pagesize?: number;
}


export interface PaginatedResponseModel<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export interface ResponseModel<T> {
  data: T;
  success: boolean;
}

