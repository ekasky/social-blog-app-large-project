import { Request, Response } from 'express';
import { request_logger } from '../../logs/logger';
import jwt from 'jsonwebtoken';
import VerifyJwtPayoadInterface from '../../interfaces/VerifyJwtPayloadInterface';
import UserModel from '../../database/models/UserModel';

const verifyController = async (req:Request, res:Response) => {

    try {

        // Get the JWT from the url
        const token = req.params.token;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as VerifyJwtPayoadInterface;
        const user_id = decoded.userId;

        // Find the user by id from the token
        const user = await UserModel.findById(user_id);

        if(user === null) {

            request_logger('ERROR', 'User not found', req, true);

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Update the user's verify status to true
        user.verfied = true;
        await user.save();

        // Redirect to login page, for now send json
        return res.status(200).json({
            message: 'Account verified successfully'
        });

    }
    catch(error) {

        request_logger('ERROR', `Error validating account: ${error}`, req, true);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default verifyController;