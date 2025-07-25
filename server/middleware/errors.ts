import type { NextFunction, Request, Response } from "express";
import type { HttpException } from "../exceptions/root";

export const errorAleMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
}