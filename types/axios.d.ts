export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export interface RequestOptions {
  urlPrefix?: string;
  specialToken?: string;
  errorMassge?: boolean;
  withToken?: boolean;
  errorMessageMode?: ErrorMessageMode;
}
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}
