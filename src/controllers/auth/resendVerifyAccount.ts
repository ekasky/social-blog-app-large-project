import { Request, Response } from 'express';
import UserModel from '../../database/models/UserModel';
import { request_logger } from '../../logs/logger';
import sendVerifyEmail from '../../utils/sendVerifyEmail';

const resendVerifyAccount = async (req:Request, res:Response) => {

    try {

        const { email } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({email});

        if(user === null) {

            request_logger('ERROR', 'User not found', req, true);

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // if account is already verified return already verfied message
        if(user.verfied === true) {

            request_logger('INFO', 'Account already verified', req, true);

            return res.status(200).json({
                message: 'Account already verified'
            });

        }

        // Send a new verify email
        await sendVerifyEmail(email, user.id);

        // Return success message

        request_logger('INFO', 'Verification email send', req, true);
        
        return res.status(200).json({
            message: 'Verification email send'
        });
 
    }
    catch(error) {
        
        request_logger('ERROR', `Error requesting verification email: ${error}`,req, true);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default resendVerifyAccount;