import 'dotenv/config'
export const env = {
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN || 'SECRET_ACCESS_TOKEN',
  SECRET_REFRESH_TOKEN:
    process.env.SECRET_REFRESH_TOKEN || 'SECRET_REFRESH_TOKEN',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
  APPLE_CLIENT_SECRET: process.env.APPLE_CLIENT_SECRET || '',
  APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID || '',
}
