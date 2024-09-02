import winston from 'winston';
import loggerLevels from '../config/loggerLevels.js'; 

const { combine, timestamp, printf, errors, colorize } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const developmentLogger = winston.createLogger({
  level: 'debug', // Mínimo nivel en desarrollo
  levels: loggerLevels.levels,
  format: combine(
    colorize(),
    timestamp(),
    customFormat
  ),
  transports: [
    new winston.transports.Console() // Solo consola en desarrollo
  ]
});

const productionLogger = winston.createLogger({
  level: 'info', // Mínimo nivel en producción
  levels: loggerLevels.levels,
  format: combine(
    timestamp(),
    errors({ stack: true }),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }) // Error.log para errores en producción
  ]
});

const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;

export default logger;
