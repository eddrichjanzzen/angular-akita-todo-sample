export interface PaginatedResponseModel<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}
