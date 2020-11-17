const winston = require('winston'); // for transports.Console
const path = require('path');
const fs = require('fs');
const DailyRotateFile = require('winston-daily-rotate-file');
const ip = require('ip');
import { Request } from 'express';
const mkdirp = require('mkdirp');

export class Logger {

    private static logger;
    // private static logDirectory = path.join('/var/www', 'logs'); // DEV value

    private static _errorLogger;
    private static logDirectory = path.join(process.cwd(), 'SpeechApi-api-logs');
    private static defaultConfig = {
        json: false,
        datePattern: "DD-MM-YYYY",
        prepend: false,
        localTime: true,
        zippedArchive: true,
        filename: path.join(Logger.logDirectory, "SpeechApi-%DATE%.log"),
        prettyPrint: true,
        maxSize: '2m', // 1 MB
        maxFiles: '14d'
    };

    private static createFolderIfNotExists() {
        if (!fs.existsSync(Logger.logDirectory)) {
            mkdirp(Logger.logDirectory, function (err1) {
                if (err1) {
                    Logger.logDirectory = path.join(__dirname, 'logs');
                    mkdirp(Logger.logDirectory, function (err2) {
                        if (err2) {
                            console.error("Error" + err2);
                        } else {
                            Logger.setLogger();
                        }
                    });
                } else {
                    Logger.setLogger();
                }
            });
        }
    }

    private static setLogger() {
        this.logger = winston.createLogger({
            transports: [
                new DailyRotateFile({
                    json: false,
                    datePattern: "DD-MM-YYYY",
                    prepend: false,
                    localTime: true,
                    zippedArchive: true,
                    filename: path.join(Logger.logDirectory, "SpeechApi-api-%DATE%.log"),
                    prettyPrint: true,
                    maxSize: '2m', // 1 MB
                    maxFiles: '14d'
                }),
            ],
            exitOnError: false
        });
    }

    public static ConfigureLogger() {
        Logger.createFolderIfNotExists();
    }

    private static GetValue(value: any) {
        if (typeof value === "string") {
            return value;
        } else {
            return JSON.stringify(value);
        }
    }

    public static debug(name: string, value: any, req: Request) {
        this.writeLog('debug', name, value, req);
    }

    public static error(name: string, value: any, req: Request) {
        this.writeLog('error', name, value, req);
    }

    public static warn(name: string, value: any, req: Request) {
        this.writeLog('warn', name, value, req);
    }

    public static info(name: string, value: any, req: Request) {
        this.writeLog('info', name, value, req);
    }


    private static writeLog(type: string, name: string, value: any, req: Request) {
        const lg = `${ip.address()}   ${this.GetValue(value)}`;        
        if (this.logger) {
            switch (type) {
                case 'error':
                    this.logger.error(lg);
                    break;
                case 'warn':
                    this.logger.warn(lg);
                    break;
                case 'debug':
                    this.logger.debug(lg);
                    break;
                default:
                    this.logger.info(lg);
                    break;
            }
        }
    }
}
