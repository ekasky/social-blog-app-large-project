import mongoose from "mongoose";


export default interface UserInterface {

    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    verfied: boolean;
    locked: boolean;
    loginAttempts: number;
    created_at: Date;
    last_login: Date;

};