import express from 'express';
import dotenv from 'dotenv';
import { logger } from './logs/logger';
import authRouter from './routes/authRouter';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => {

    logger('INFO', `Server started listening on port ${PORT}`, true);

});