import express from 'express';
import sanitizer from '../middleware/sanitizer';
import validateRegisterRequest from '../middleware/validateRegisterRequest';
import registerController from '../controllers/auth/registerController';
import verifyController from '../controllers/auth/verifyController';

const authRouter = express.Router();

authRouter.post('/register', sanitizer, validateRegisterRequest, registerController);
authRouter.get('/verify/:token', verifyController);
authRouter.post('/resend-verify', (req, res) => {});
authRouter.post('/reset-password', (req, res) => {});
authRouter.post('/login', (req, res) => {});
authRouter.post('/logout', (req, res) => {});

export default authRouter;