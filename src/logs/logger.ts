import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import LogLevelInterface from '../interfaces/LogLevelInterface';

const logFilePath = path.resolve(__dirname, 'server.log');

const logger = (level:LogLevelInterface['level'] = 'INFO', message:string = 'Log message goes here', print_to_console:boolean = true):void => {

    const timestamp   = new Date().toISOString();
    const log_message = `${timestamp} -- [${level}]: ${message}`;

    fs.appendFile(logFilePath, log_message + '\n', (error) => {

        if(error) {
            console.log(`ERROR WRITING TO THE LOG FILE: ${error}`);
        }

    });

    if(print_to_console === true) {

        console.log(log_message);

    }

};

const request_logger = (level:LogLevelInterface['level'] = 'INFO', message:string = 'Log message goes here', req:Request, print_to_console:boolean = true):void => {

    const timestamp   = new Date().toISOString();
    const ip          = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const method      = req.method;
    const url         = req.originalUrl;
    const userAgent   = req.headers['user-agent'] || 'unknown';
    const log_message = `${timestamp} -- [${level}]: ${message} -- IP ADDRESS: ${ip} -- METHOD: ${method} -- URL: ${url} -- USER AGENT: ${userAgent}`;

    fs.appendFile(logFilePath, log_message + '\n', (error) => {

        if(error) {
            console.log(`ERROR WRITING TO THE LOG FILE: ${error}`);
        }

    });

    if(print_to_console === true) {

        console.log(log_message);

    }

};

export { logger, request_logger };