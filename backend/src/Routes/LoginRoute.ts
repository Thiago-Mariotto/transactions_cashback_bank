import { Router } from 'express';
import LoginController from '../Controllers/LoginController';

const router = Router();
const loginController = new LoginController();
router.post('/', (req, res, next) => loginController.Login(req, res, next));

export default router;