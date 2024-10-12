import dotenv from "dotenv"; 
import "dotenv/config";

const ENV =
  process.argv.slice(2)[0] === "prod"
    ? process.argv.slice(2)[0]
    : process.env.ENV; 
const PERSISTENCE = process.argv.slice(2)[1];
const languagesAvailable = process.env.LANGUAGESAVAILABLE;
const LANGUAGE = languagesAvailable.includes(process.argv.slice(2)[2])
  ? process.argv.slice(2)[2]
  : process.env.LANGUAGE;

export default {
  MONGO_URL: process.env.MONGO_URL,
  COOKIE_KEY: process.env.COOKIE_KEY,
  SESSION_KEY: process.env.SESSION_KEY,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL,
  NODE_ENV: ENV,
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  PERSISTENCE: PERSISTENCE,
  LANGUAGE: LANGUAGE,
  PORT_GMAIL: process.env.PORT_GMAIL,
  SENDER_GMAIL_USER: process.env.SENDER_GMAIL_USER,
  SENDER_GMAIL_PASS: process.env.SENDER_GMAIL_PASS,
};
