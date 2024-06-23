import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', (req, res) => {});
authRouter.post('/verify', (req, res) => {});
authRouter.post('/reset-password', (req, res) => {});
authRouter.post('/login', (req, res) => {});
authRouter.post('/logout', (req, res) => {});

export default authRouter;