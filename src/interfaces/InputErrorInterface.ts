
export interface InputErrorInterface {

    type: 'sanitization' | 'validation';
    message: string;

};

export type FieldErrors = InputErrorInterface[];

export interface ErrorResponse {

    errors: {
        [fieldName: string]: FieldErrors;
    };

};