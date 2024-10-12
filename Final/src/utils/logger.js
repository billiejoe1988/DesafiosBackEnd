import winston from "winston";
import localconfig from "../../config.js";
import { __dirname } from "./utils.js";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
};

const dev = {
  levels: customLevels.levels,
  level: "debug",
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(winston.format.simple()),
    }),
  ],
};
const prod = {
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(winston.format.simple()),
    }),
    new winston.transports.File({
      filename: `${__dirname}/../logs/error.log`,
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      ),
    }),
  ],
};

const ENV = localconfig.NODE_ENV;
const ENV_CONFIG = ENV === "prod" ? prod : dev;

export const logger = winston.createLogger(ENV_CONFIG);
