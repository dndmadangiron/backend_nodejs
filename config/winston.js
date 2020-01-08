const rootPath = require('app-root-path');
const winston = require('winston');
const process = require('process');

const { combine, timestamp, label, printf } = winston.format;

const customFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`;
});

let date = new Date();
let today = '';
today += date.getFullYear(); 
today += (date.getMonth().length == 1) ? '0'+date.getMonth() : date.getMonth();
today += (date.getDate().length == 1) ? '0'+date.getDate() : date.getDate();


const options = {
    file: {
        level: 'info',
        filename: `${rootPath}/logs/${today}.log`,
        handleExceptions: true,
        json: false,
        maxSize: null,
        maxFiles: 60,
        colorize: false,
        format: combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            customFormat
        )
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            customFormat
        )
    }
}

let logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console(options.console));
}

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
}

module.exports = logger;