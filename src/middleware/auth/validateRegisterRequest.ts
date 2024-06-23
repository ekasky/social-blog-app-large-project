import { Request, Response, NextFunction } from 'express';
import { check, validationResult, ValidationError  } from 'express-validator';
import { request_logger } from '../../logs/logger';

const validateRegisterRequest = [

    check('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({max: 50}).withMessage('First name cannot exceed 50 characters in length')
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/).withMessage('First name contains invalid characters. Only alphabetic characters, spaces, hyphens, and apostrophes are allowed.'),

    check('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({max: 50}).withMessage('Last name cannot exceed 50 characters in length')
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/).withMessage('Last name contains invalid characters. Only alphabetic characters, spaces, hyphens, and apostrophes are allowed.'),

    check('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Invalid email format'),

    check('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({max: 50}).withMessage('Username cannot exceed 50 characters')
    .matches(/^[A-Za-z0-9_-]+$/).withMessage('Invalid username characters. Only alphanumeric, underscores, and hyphens allowed'),

    check('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({max:64}).withMessage('Password cannot exceed 64 characters in length')
    .isStrongPassword().withMessage('Password is weak. Must be atleast 8 characters long, contain one lowercase, one uppercase, one number, and one symbol.'),

    check('confirm_password')
    .trim()
    .notEmpty().withMessage('Confirm password is required')
    .isLength({max: 64}).withMessage('Confirm password cannot exceed 64 characters in length')
    .custom((confirm_pass, { req }) => {

        if(confirm_pass !== req.body.password) {
            throw new Error('Passwords do not match')
        }

        return true;

    }),

    (req:Request, res:Response, next:NextFunction) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {

            const formattedErrors: { [key: string]: string[] } = {};

            errors.array().forEach((error) => {
                if ('path' in error) {
                    if (!formattedErrors[error.path]) {
                        formattedErrors[error.path] = [];
                    }
                    formattedErrors[error.path].push(error.msg);
                }
            });

            (req as any).validation_errors = formattedErrors;

        }

        next();

    }

];

export default validateRegisterRequest;