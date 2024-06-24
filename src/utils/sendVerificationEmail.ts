import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { logger } from '../logs/logger';

const sendVerifyEmail = async (email:string, userId:mongoose.Types.ObjectId) => {

    try {

        // Generate a verification token
        const token = jwt.sign(
            {
                userId
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1h',
            }
        );

        // Create a transporter
        const transporter = nodemailer.createTransport({

            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT as string, 10),
            secure: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }


        });

        // Create email content
        const message = {

            from: process.env.NODEMAILER_USER,
            to: email,
            subject: 'Verify your account',
            html: `
                <p>Hello,</p>
                <p>Please click the link to verify your account: <a href="${process.env.VERIFY_BASE_URL}/api/auth/verify/${token}">Verify</a></p>
                <p>This link will expire in 1 hour.</p>
            `

        };

        // Send the email
        await transporter.sendMail(message);

    }
    catch(error) {

        logger('ERROR', `Error sending email: ${error}`, true);

    }


};

export default sendVerifyEmail;