import { NextFunction, Request, Response, Router } from 'express';
import { AccountController, AuthController, TransactionController } from '../Controllers';

const router = Router();
const accountController = new AccountController();
const transactionController = new TransactionController();
const authController = new AuthController();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => authController.validateToken(req, res, next);

router.post('/', (req: Request, res: Response, next: NextFunction) => accountController.CreateAccount(req, res, next));

router.post('/:accountId/transactions',
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => transactionController.CreateTransaction(req, res, next));

router.get('/:accountId/transactions',
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => transactionController.UserTransactions(req, res, next));
export default router;