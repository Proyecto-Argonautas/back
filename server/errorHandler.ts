import type { Request, Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internalException";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error: any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                exception = new InternalException('something went wrong', error, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception); 
        }
    }
}