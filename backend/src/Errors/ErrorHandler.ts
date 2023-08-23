import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import HttpError from './HttpError';


export default class ErrorHandler {
  execute(err: HttpError, _req: Request, res: Response, _next: NextFunction): Response {

    console.log('ERRO 500', err);
    if (err instanceof ZodError) {
      return res.status(400).json({ message: err.issues[0].message });
    }

    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}