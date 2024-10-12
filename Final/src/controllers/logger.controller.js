import { httpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";

export const loggerTest = async (req, res, next) => {
  try {
    logger.fatal("logger test fatal");
    logger.error("logger test error");
    logger.warning("logger test warning");
    logger.info("logger test info");
    logger.http("logger test http");
    logger.debug("logger test debug");
    httpResponse.Ok(res, "LoggerTest ejecutado");
  } catch (error) {
    throw new Error(error);
  }
};
