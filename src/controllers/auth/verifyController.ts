import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import VerifyJwtPayloadInterface from '../../interfaces/VerifyJetPayloadInterface';
import UserModel from '../../database/models/UserModel';
import { request_logger } from '../../logs/logger';

const verifyController = async (req:Request, res:Response) => {

    try {

        // Get the verification token from the url
        const token = req.params.token;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as VerifyJwtPayloadInterface;

        // Get the user id from the token
        const userId = decoded.userId;

        // Find the user's collection by id
        const user = await UserModel.findById(userId);

        if(user === null) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Update the user's collection to be verified true
        user.verfied = true;
        await user.save();

        // Redirect to login page (For now send a json response)
        return res.status(200).json({
            message: 'Account verified successfully'
        });

    }
    catch(error) {

        request_logger('ERROR', `Error validating account: ${error}`, req, true);

        return res.status(500).json({
            message: 'Error validating account'
        });

    }

};

export default verifyController;