export type Response<T> = {
  code: string;
  message: string;
  data: T;
};
