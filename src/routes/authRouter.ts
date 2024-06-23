import express, {Request, Response} from 'express';
import validateRegisterRequest from '../middleware/auth/validateRegisterRequest';

const authRouter = express.Router();

authRouter.post('/register', validateRegisterRequest, (req:Request, res:Response) => {

    console.log(req.body);

    return res.status(200).send('okay');

});
authRouter.post('/verify', (req, res) => {});
authRouter.post('/reset-password', (req, res) => {});
authRouter.post('/login', (req, res) => {});
authRouter.post('/logout', (req, res) => {});

export default authRouter;