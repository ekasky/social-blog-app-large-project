import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';
import { ErrorResponse } from '../interfaces/InputErrorInterface';

const sanitizer = (req:Request, res:Response, next:NextFunction) => {

    const body                 = req.body;
    const errors:ErrorResponse = { errors: {} };
    
    Object.keys(body).forEach(field => {

        const dirty_field_value = body[field];

        const clean_field_value = sanitizeHtml(dirty_field_value, { allowedTags: [], allowedAttributes: {} });

        // Check if the cleaned value matches the input value
        if(clean_field_value !== dirty_field_value) {

            if(!errors.errors[field]) {
                errors.errors[field] = [];
            }

            errors.errors[field].push({
                type: 'sanitization',
                message: `${field} contained disallowed HTML tags or attributes`
            });

        }

    });

    // If there are any errors attach them to the request object
    if(Object.keys(errors.errors).length > 0) {

        (req as any).errors = errors;

    }

    next();

};

export default sanitizer;