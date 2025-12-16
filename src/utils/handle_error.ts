import { BadRequestException, HttpStatus, ServiceUnavailableException } from "@nestjs/common";
import { Response } from "express";
import sequelize from "sequelize";
import { IResponse } from "src/types/response";

export default function handleError(error: sequelize.QueryError, res: Response): IResponse<null> {
    if(error instanceof sequelize.QueryError) {
        res.statusCode = HttpStatus.BAD_REQUEST
        throw new BadRequestException("Bad Request")
    } 
    res.statusCode = HttpStatus.SERVICE_UNAVAILABLE
    throw new ServiceUnavailableException('Server Error')
}