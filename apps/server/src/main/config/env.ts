import "dotenv/config";
let MAIL_SECURE: boolean | null = null;
if (process.env.MAIL_SECURE) {
  MAIL_SECURE = process.env.MAIL_SECURE === "true";
}

export const env = {
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN || "SECRET_ACCESS_TOKEN",
  SECRET_REFRESH_TOKEN:
    process.env.SECRET_REFRESH_TOKEN || "SECRET_REFRESH_TOKEN",
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "",
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "",
  MAIL_HOST: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io",
  MAIL_PORT: Number(process.env.MAIL_PORT) || 465,
  MAIL_SECURE: MAIL_SECURE || false,
  MAIL_AUTH_USER: process.env.MAIL_AUTH_USER || "237f6cddc7bd86",
  MAIL_AUTH_PASS: process.env.MAIL_AUTH_PASS || "5f2205551637fe",
};
