import { Request, Response } from 'express';
import { request_logger } from '../../logs/logger';
import UserModel from '../../database/models/UserModel';
import bcrypt, { hash } from 'bcrypt';

const registerController = async (req:Request, res:Response) => {

    try {

        // Extract request fields from body
        const { first_name, last_name, email, username, password } = req.body;

        const validation_errors = (req as any).validation_errors;
        let errors: { [key: string]: string[] } = validation_errors || {};

        // Check to see if the email address is already taken
        let user = await UserModel.findOne({email});

        if(user !== null) {
            
            if (!errors.email) {
                
                errors.email = [];

            }

            errors.email.push('Email already in use');

        }

        // Check to see if the username is already in use
        user = await UserModel.findOne({username});

        if(user !== null) {

            if (!errors.username) {
                
                errors.username = [];

            }

            errors.username.push('Username is taken');

        }

        // If there are any errors, return them
        if (Object.keys(errors).length > 0) {


            const errorSummary = Object.entries(errors).map(([field, messages]) => `${field}: ${messages.join(', ')}`).join('; ');

            request_logger('ERROR', `Validation failed for user registration: ${errorSummary}`, req, true);

            return res.status(400).json({ 
                errors 
            });

        }

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user
        const new_user = new UserModel({first_name, last_name, email, username, password:hash});
        await new_user.save();

        // Return a success response
        request_logger('INFO', 'User registered successfully', req, true);
        
        return res.status(201).json({
            message: 'User registered successfully'
        });

    }
    catch(error) {

        request_logger('ERROR', `Internal Server Error: ${error}`, req, true);

        return res.status(500).json({
            message: `Internal Server Error: ${error}`
        });

    }

};

export default registerController;