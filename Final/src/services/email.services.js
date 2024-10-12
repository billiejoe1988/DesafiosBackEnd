import { createTransport } from "nodemailer";
import config from "../../config.js";

const gmailTransportOption = {
  service: "gmail",
  port: config.PORT_GMAIL,
  secure: true,
  auth: {
    user: config.SENDER_GMAIL_USER,
    pass: config.SENDER_GMAIL_PASS,
  },
};

export const gmailTransporter = createTransport(gmailTransportOption);
