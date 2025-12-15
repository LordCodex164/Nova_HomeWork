export interface IResponse<T> {
    status: "error" | "success";
    message: string;
    data?: T | null;
    error?: IResponseError;
  }

  export interface IResponseError {
    name: string;
    errors?: {
      [key: string]:
        | string
        | { [key: string]: string }[]
        | { [key: string]: { [key: string]: string } };
    };
    debug?: string;
  }