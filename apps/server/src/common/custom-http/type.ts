export type CustomResponse<T> = {
  code: string;
  message: string;
  results: T;
};
