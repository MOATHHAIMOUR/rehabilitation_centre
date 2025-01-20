export interface IGenericApiResponse<T> {
  data: T;
  meta: IMetaPagination;
  message: string;
  errors: string[];
  statusCode: number;
}

interface IMetaPagination {
  totalPages: number;
  count: number;
}
