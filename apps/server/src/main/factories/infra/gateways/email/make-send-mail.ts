import { NodemalierSendMail } from "@/infra/gateways/email/nodemalier-send-mail";
import { env } from "@/main/config/env";

export const makeSendMail = () =>
  new NodemalierSendMail({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: env.MAIL_SECURE,
    auth: {
      user: env.MAIL_AUTH_USER,
      pass: env.MAIL_AUTH_PASS,
    },
  });
