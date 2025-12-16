import { ValidationError, ValidationOptions, ValidatorOptions } from "class-validator";
import { IResponse } from "./types/response";

export interface ValidationPipeOptions extends ValidationOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    exceptionFactory?: (errors: ValidationError[])  => IResponse<null> 
}

export const validationOptions: ValidationPipeOptions = {
    transform: true,
    disableErrorMessages: false,
    exceptionFactory: (errors: ValidationError[]) => ({
        status: "error",
        message: "Input Validation error",
        error: {
            errors,
            name: "BadRequest"
        }
    })
  }
  