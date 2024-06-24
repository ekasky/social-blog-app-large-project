import express, {Request, Response} from 'express';
import sanitizer from '../middleware/sanitizer';
import { ErrorResponse } from '../interfaces/InputErrorInterface';
import validateRegisterRequest from '../middleware/validateRegisterRequest';

const authRouter = express.Router();

authRouter.post('/register', sanitizer, validateRegisterRequest, (req:Request, res:Response) => {

    const errors = (req as any).errors as ErrorResponse | undefined;

    if(errors && Object.keys(errors.errors).length > 0) {

        return res.status(400).json(errors);

    }

    return res.status(200).send('okay');

});
authRouter.get('/verify/:token', (req, res) => {});
authRouter.post('/resend-verify', (req, res) => {});
authRouter.post('/reset-password', (req, res) => {});
authRouter.post('/login', (req, res) => {});
authRouter.post('/logout', (req, res) => {});

export default authRouter;