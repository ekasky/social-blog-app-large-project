import { Request, Response, NextFunction } from 'express';
import { body, validationResult, FieldValidationError } from 'express-validator';
import { ErrorResponse } from '../interfaces/InputErrorInterface';

const validateRequestVerifyRequest = [

    body('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Invalid email address format'),

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

export default validateRequestVerifyRequest;