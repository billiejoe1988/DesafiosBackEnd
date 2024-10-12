import mongoose from "mongoose";
import { logger } from "../../utils/logger.js";
import config from "../../../config.js";

const connectionString = config.MONGO_URL || "mongodb://localhost:27017/";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    logger.info("conectado a mongo Atlas");
  } catch (error) {
    logger.error(error);
  }
};
