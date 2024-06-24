import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { logger } from '../logs/logger';

const sendVerifyEmail = async (email:string, userId: mongoose.Types.ObjectId) => {

    try {

        const token = jwt.sign({userId}, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        // Create a transporter
        const transporter = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ADMIN_EMAIL as string,
                pass: process.env.ADMIN_PASS as string
            }

        });

        // Create the verify email
        const message = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Verify your account',
            html: 
            `
                <p>Hello,</p>
                <p>Please click the link to verify your account: <a href="${process.env.VERIFY_EMAIL_BASE_URL}/api/auth/verify/${token}">Verify</a></p>
                <p>This link will expire in 1 hour.</p>
            `
        };

        // Send the email
        const info = await transporter.sendMail(message);

    }
    catch(error) {

        logger('ERROR', `Error sending email: ${error}`, true);

    }

};

export default sendVerifyEmail;