import { httpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next, msg = "") => {
  const status = error.stack || 500;
  logger.error(error.message);
  httpResponse.ServerError(res, error.message, error);
};
