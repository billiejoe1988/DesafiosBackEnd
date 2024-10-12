import { httpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";

export const isAdmin = (req, res, next) => {
  try {
    const { role } = req.session?.message;
    if (role !== "admin") {
      const data = JSON.stringify(req.session.message);
      logger.warning(
        `Unauthorized access try: ${data}, administrator role only`
      );
      return httpResponse.Unauthorized(
        res,
        { role: role },
        "administrator role only"
      );
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

export const isAdminoOrPremium = (req, res, next) => {
  try {
    const { role } = req.session?.message;
    if (role !== "admin" && role !== "premium") {
      return httpResponse.Unauthorized(
        res,
        { role: role },
        `Unauthorized access try, administrator or Premium role only`
      );
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
};
