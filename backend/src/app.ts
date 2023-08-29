import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import ErrorHandler from './Errors/ErrorHandler';
import HttpError from './Errors/HttpError';
import { AccountRoute, LoginRoute } from './Routes';
dotenv.config();

class App {
  public app: express.Express;

  constructor() {
    const errorHandler = new ErrorHandler();
    this.app = express();
    this.config();
    this.routes();
    this.app.use((err: HttpError, req: Request, res: Response, next: NextFunction) =>
      errorHandler.execute(err, req, res, next));
  }

  private routes(): void {
    this.app.use('/accounts', AccountRoute);
    this.app.use('/login', LoginRoute);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number) {
    return this.app.listen(PORT);
  }

  public stop() {
    this.app.listen().close();
  }
}

export { App };
