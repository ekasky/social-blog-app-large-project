import express from 'express';
import dotenv from 'dotenv';
import { logger } from './logs/logger';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.listen(PORT, () => {

    logger('INFO', `Server started listening on port ${PORT}`, true);

});