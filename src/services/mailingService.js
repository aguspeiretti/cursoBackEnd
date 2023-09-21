import nodemailer from "nodemailer";
import config from "../config.js";
import DMails from "../constants/DMails.js";
import { generateMailTemplate } from "../utils.js";

const APP_PASSWORD = "twmhvamirbvumskn";
const APP_EMAIL = "agupeiretti@gmail.com";

export default class mailService {
  constructor() {
    this.mailer = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        // user: config.mailer.USER,
        // password: config.mailer.PASSWORD,
        user: APP_EMAIL,
        pass: APP_PASSWORD,
      },
    });
  }
  sendMail = async (emails, template, payload) => {
    const mailInfo = DMails[template];
    const html = await generateMailTemplate(template, payload);
    const result = await this.mailer.sendMail({
      from: "coder -erp <agus>",
      to: emails,
      html,
      ...mailInfo,
    });
    return result;
  };
}
