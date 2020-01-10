const rootPath = require('../node_modules/app-root-path');
const winston = require('../node_modules/winston');
const process = require('process');

const { combine, timestamp, label, printf } = winston.format;

const customFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`;
});

let date = new Date();
let today = '';
today += date.getFullYear(); 
/** JINU 수정
 * getMonth()가 0부터 시작함. 0:January ~ 11:December
 * 따라서 +1 추가함
 * 참고 >> https://www.w3schools.com/jsref/jsref_getmonth.asp 
 * 
 * 뒷부분도 혹시 return type issue가 있을 수 있어서 ''를 추가함
 * 해당 주석은 확인 하고 지워도 됨
 * */

today += ((date.getMonth()+1).length == 1) ? '0'+(date.getMonth()+1) : ''+(date.getMonth()+1);
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
    error: {
        level: 'error',
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
        new winston.transports.File(options.error),
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