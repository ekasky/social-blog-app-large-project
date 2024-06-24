import { Request, Response } from 'express';
import { ErrorResponse } from '../../interfaces/InputErrorInterface';
import UserModel from '../../database/models/UserModel';
import { request_logger } from '../../logs/logger';
import sendVerifyEmail from '../../utils/sendVerificationEmail';

const requestVerifyController = async (req:Request, res:Response) => {

    try {

        // Get the errors from the middleware
        const errors = (req as any).errors as ErrorResponse || { errors: {} };

        // Check to see if there are any errors
        if(Object.keys(errors.errors).length > 0) {

            request_logger('ERROR', `${JSON.stringify(errors)}`, req, true);

            return res.status(400).json(errors);
    
        }

        // Extract the email out of the request body
        const { email } = req.body;

        // Attempt to find the user
        const user  = await UserModel.findOne({email});

        if(user === null) {

            request_logger('ERROR', 'User not found', req, true);

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Check if the account is already verified
        if(user.verfied === true) {

            request_logger('INFO', 'User already verified', req, true);

            return res.status(200).json({
                message: 'User already verified'
            });

        }

        // Send the verify email
        await sendVerifyEmail(email, user.id);

        // Return success response
        return res.status(200).json({
            message: 'Verification email sent'
        });

    }
    catch(error) {

        request_logger('ERROR', `Error requesting a verification email: ${error}`, req, true);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default requestVerifyController;