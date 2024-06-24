import { Request, Response } from 'express';
import { ErrorResponse } from '../../interfaces/InputErrorInterface';
import UserModel from '../../database/models/UserModel';
import { request_logger } from '../../logs/logger';
import bcrypt from 'bcrypt';

const registerController = async (req:Request, res:Response) => {

    // Get the errors from the middleware
    const errors = (req as any).errors as ErrorResponse || { errors: {} };

    // Extract the request fields from the body
    const { first_name, last_name, email, username, password } = req.body;

    try {

        // Check to see if the email address is already in use
        let user = await UserModel.findOne({email});

        if (user !== null) {
            if (!errors.errors['email']) {
                errors.errors['email'] = [];
            }
            errors.errors['email'].push({
                type: 'validation',
                message: 'Email address already in use'
            });
        }

        // Check to see if the username id already in use
        user = await UserModel.findOne({username});

        if(user !== null) {

            if(!errors.errors['username']) {
                errors.errors['username'] = [];
            }

            errors.errors['username'].push({
                type: 'validation',
                message: 'Username is taken'
            });

        }

        // Check to see if there are any errors
        if(Object.keys(errors.errors).length > 0) {

            request_logger('ERROR', `${JSON.stringify(errors)}`, req, true);

            return res.status(400).json(errors);
    
        }

        // Hash the user's password for safe storage in the db
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user
        const new_user = new UserModel({first_name, last_name, email, username, password:hash});
        await new_user.save();


        return res.status(201).json({
            message: 'okay'
        });

    }
    catch(error) {

        request_logger('ERROR', `Could not create new user: ${error}`, req, true);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default registerController;