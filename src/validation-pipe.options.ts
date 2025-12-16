import { ValidationError, ValidationOptions } from "class-validator";
import { BadRequestException, HttpException } from "@nestjs/common";

export interface ValidationPipeOptions extends ValidationOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    exceptionFactory?: (errors: ValidationError[])  => HttpException 
}

export const validationOptions: ValidationPipeOptions = {
    transform: true,
    disableErrorMessages: false,
    exceptionFactory: (errors: ValidationError[]) => new BadRequestException("Input Validation error", {
        description: "error",
        cause: errors,
    })
  }
  