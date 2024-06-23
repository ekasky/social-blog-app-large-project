import express, {Request, Response} from 'express';
import validateRegisterRequest from '../middleware/auth/validateRegisterRequest';
import registerController from '../controllers/auth/registerController';

const authRouter = express.Router();

authRouter.post('/register', validateRegisterRequest, registerController);
authRouter.post('/verify', (req, res) => {});
authRouter.post('/reset-password', (req, res) => {});
authRouter.post('/login', (req, res) => {});
authRouter.post('/logout', (req, res) => {});

export default authRouter;