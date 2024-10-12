import { gmailTransporter } from "../services/email.services.js";
import config from "../../config.js";
import { logger } from "../utils/logger.js";
import { httpResponse } from "../utils/httpResponse.js";
import {
  loginTemplate,
  registerTemplate,
  resetPass,
  passwordRestored,
  updateUser,
  roleChange,
  inactive,
  productDeleted,
} from "../utils/email.templates.js";

const emailType = {
  register: {
    subject: `Gracias por suscribirte a LiquidStore`,
    html: function (user) {
      return registerTemplate(user);
    },
  },
  login: {
    subject: `Nuevo inicio de sesion registrado`,
    html: function (user) {
      return loginTemplate(user);
    },
  },
  reset: {
    subject: `Password restore`,
    html: function (user) {
      return resetPass(user);
    },
  },
  passwordRestored: {
    subject: `tu password ha sido actualizado correctamente`,
    html: function (user) {
      return passwordRestored(user);
    },
  },
  updateUser: {
    subject: `Tus datos de usuario han sido actualizado correctamente`,
    html: function (user) {
      return updateUser(user);
    },
  },
  rolePremium: {
    subject: `Felicitaciones ya eres un usuario premium`,
    html: function (user) {
      return roleChange(user);
    },
  },
  roleUser: {
    subject: `Lamentamos que hayas decidido dejar de ser premium`,
    html: function (user) {
      return roleChange(user);
    },
  },
  inactive: {
    subject: `Lamentamos informarte que por falta de uso hemos desactivado tu usuario`,
    html: function (user) {
      return inactive(user);
    },
  },
  productDeleted: {
    subject: `El producto ha sido correctamente eliminado`,
    html: function (user, product) {
      return productDeleted(user, product);
    },
  },
};

export const sendGmail = async (req, res, next) => {
  try {
    const user = req.session?.message;
    const type = req.session?.emailType;
    const productDeleted = req.session?.productDeleted || null;
    const { subject } = emailType[type];

    const gmailOptions = {
      from: `LiquidStore <${config.SENDER_GMAIL_USER}>`,
      to: user.email,
      subject,
      html: emailType[type].html(user, productDeleted),
    };

    const response = await gmailTransporter.sendMail(gmailOptions);
    if (!response) httpResponse.error(res, response, "sending mail");

    logger.info(
      `${gmailOptions.subject},  ${JSON.stringify(response.envelope)}`
    );
  } catch (error) {
    next(error);
  }
};
