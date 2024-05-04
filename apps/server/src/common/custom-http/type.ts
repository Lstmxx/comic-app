
export type Response<T> = {
  code: string;
  message: string;
  results: T;
};