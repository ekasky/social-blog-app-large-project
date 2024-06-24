import express, {Request, Response} from 'express';
import validateRegisterRequest from '../middleware/auth/validateRegisterRequest';
import registerController from '../controllers/auth/registerController';
import verifyController from '../controllers/auth/verifyController';

const authRouter = express.Router();

authRouter.post('/register', validateRegisterRequest, registerController);
authRouter.get('/verify/:token', verifyController);
authRouter.post('/reset-password', (req, res) => {});
authRouter.post('/login', (req, res) => {});
authRouter.post('/logout', (req, res) => {});

export default authRouter;