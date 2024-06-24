import { Request, Response, NextFunction } from 'express';
import { body, validationResult, FieldValidationError } from 'express-validator';
import { ErrorResponse } from '../interfaces/InputErrorInterface';

const validateRegisterRequest = [

    body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({max: 50}).withMessage('First name cannot exceed 50 characters'),

    body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({max: 50}).withMessage('Last name cannot exceed 50 characters'),

    body('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Invalid email address format'),

    body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({max: 50}).withMessage('Username cannot exceed 50 characters'),

    body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({max: 64}).withMessage('Password cannot exceed 64 characters')
    .isStrongPassword().withMessage('Password is weak. Must be at least 8 characters long, and contain 1 lower case, 1 uppercase, 1 number, and 1 symbol'),

    body('confirm_password')
    .trim()
    .notEmpty().withMessage('Confirm password is required')
    .isLength({max:64}).withMessage('Confirm password cannot exceed 64 characters')
    .custom( (confirm_pass, { req }) => {

        if(confirm_pass !== req.body['password']) {
            throw new Error('Passwords do not match');
        }

        return true;

    }),
    
    (req:Request, res:Response, next:NextFunction) => {

        const errors = validationResult(req);
        let errorResponse: ErrorResponse = (req as any).errors || { errors: {} };

        // Add the validation errors to the errors req property
        if (!errors.isEmpty()) {
            // Filter and map validation errors to get paths
            const fieldErrors: FieldValidationError[] = errors.array().filter(error => error.type === 'field') as FieldValidationError[];
            fieldErrors.forEach(error => {
                if (!errorResponse.errors[error.path]) {
                    errorResponse.errors[error.path] = [];
                }
                errorResponse.errors[error.path].push({
                    type: 'validation',
                    message: error.msg
                });
            });

            (req as any).errors = errorResponse;
        }
        

        // If there are any errors attach them to the request object
        if(Object.keys(errorResponse.errors).length > 0) {

            (req as any).errors = errorResponse;

        }
        
        next();

    }

];

export default validateRegisterRequest;
