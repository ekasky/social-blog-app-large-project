import mongoose, { Schema } from 'mongoose';
import UserInterface from '../../interfaces/UserInterface';

const UserSchema = new Schema<UserInterface>({

    first_name: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    last_name: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },

    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },

    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    verfied: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },

    locked: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },

    loginAttempts: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },

    created_at: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },

    last_login: {
        type: mongoose.Schema.Types.Date,
        default: undefined
    }

});

export default UserSchema;