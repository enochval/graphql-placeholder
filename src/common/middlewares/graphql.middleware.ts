import { NextFunction, Request, Response } from "express";

export function graphqlMiddleware(req: Request, res: Response, next: NextFunction) {
    req.headers['x-apollo-operation-name'] = 'true'
    req.headers['apollo-require-preflight'] = 'true'
    next();
}