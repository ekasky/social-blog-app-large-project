import mongoose from 'mongoose';
import { logger } from '../logs/logger';

const connect = async ():Promise<void> => {

    // Get the MongoDb URI from the env vars
    const URI = process.env.URI as string;

    // Attempt to connect
    try {

        await mongoose.connect(URI);
        logger('INFO', 'Connected to MongoDB', true);

    }
    catch(error) {

        logger('ERROR', 'Failed to connect to MongoDB', true);

    }

};

export default connect;