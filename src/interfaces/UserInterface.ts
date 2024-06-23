import mongoose from "mongoose";


export default interface UserInterface {

    first_name: mongoose.Schema.Types.String;
    last_name: mongoose.Schema.Types.String;
    email: mongoose.Schema.Types.String;
    username: mongoose.Schema.Types.String;
    password: mongoose.Schema.Types.String;
    verfied: mongoose.Schema.Types.Boolean;
    locked: mongoose.Schema.Types.Boolean;
    loginAttempts: mongoose.Schema.Types.Number;
    created_at: mongoose.Schema.Types.Date;
    last_login: mongoose.Schema.Types.Date;

};