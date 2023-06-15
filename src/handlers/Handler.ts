import { Request, Response, NextFunction } from 'express';

export interface IHandler {
    process( request: Request<any>, response: Response, next?: NextFunction ): Promise<unknown>;
}