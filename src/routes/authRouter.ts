import express from 'express';
import sanitizer from '../middleware/sanitizer';
import validateRegisterRequest from '../middleware/validateRegisterRequest';
import registerController from '../controllers/auth/registerController';
import verifyController from '../controllers/auth/verifyController';
import requestVerifyController from '../controllers/auth/requestVerifyController';
import validateRequestVerifyRequest from '../middleware/validateRequestVerifyRequest';

const authRouter = express.Router();

authRouter.post('/register', sanitizer, validateRegisterRequest, registerController);
authRouter.get('/verify/:token', verifyController);
authRouter.post('/request-verify', sanitizer, validateRequestVerifyRequest, requestVerifyController);
authRouter.post('/reset-password', (req, res) => {});
authRouter.post('/login', (req, res) => {});
authRouter.post('/logout', (req, res) => {});

export default authRouter;