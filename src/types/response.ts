import { ValidationError } from "class-validator";

export interface IResponse<T> {
    status: "error" | "success";
    message: string;
    data?: T | null;
    error?: IResponseError;
  }

  export interface IResponseError {
    name: string;
    errors?: ValidationError[];
    debug?: string;
  }